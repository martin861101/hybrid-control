import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { preloadGearModel } from '../../lib/gearModel'

gsap.registerPlugin(ScrollTrigger)

function createMistTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(125, 211, 252, 0.35)')
    grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.20)')
    grad.addColorStop(0.55, 'rgba(14, 116, 144, 0.08)')
    grad.addColorStop(0.8, 'rgba(2, 20, 40, 0.02)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 128, 128)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  return texture
}

interface MistParticle {
  sprite: THREE.Sprite
  material: THREE.SpriteMaterial
  offsetX: number
  z: number
  y: number
  speedY: number
  swayAmp: number
  swayFreq: number
  phase: number
  scaleBase: number
  maxOpacity: number
}

export default function ScrollPumpModel() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      renderer.localClippingEnabled = true
    } catch (e) {
      console.warn('ScrollPumpModel: WebGL initialization failed', e)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 4.8)
    camera.lookAt(0, 0, 0)

    // Lighting matching about background atmosphere
    scene.add(new THREE.HemisphereLight(0xdcf3ff, 0x030d17, 2.2))

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8)
    keyLight.position.set(3, 5, 5)
    scene.add(keyLight)

    // Left neon-cyan spotlight
    const rimLightLeft = new THREE.DirectionalLight(0x00d2ff, 4.2)
    rimLightLeft.position.set(-5, 4, -2)
    scene.add(rimLightLeft)

    // Right electric-blue spotlight
    const rimLightRight = new THREE.DirectionalLight(0x168cff, 3.4)
    rimLightRight.position.set(5, 3, -2)
    scene.add(rimLightRight)

    // Back-glow for the circular portal
    const portalGlow = new THREE.PointLight(0x0088ff, 2.2, 8)
    scene.add(portalGlow)

    // Up-light from the circular floor pedestal
    const floorUplight = new THREE.PointLight(0x00d2ff, 2.2, 7)
    scene.add(floorUplight)

    // Main 3D model group (inside the circular ring)
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // Floor clipping plane to ensure reflection strictly stays below the floor line
    const floorClipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)

    // Reflection container (inverted Y mirror across floor)
    const mirrorContainer = new THREE.Group()
    scene.add(mirrorContainer)

    const reflectionGroup = new THREE.Group()
    mirrorContainer.add(reflectionGroup)

    // Reflective glossy contact circle on the floor
    const floorGlowGeo = new THREE.RingGeometry(0, 1.2, 48)
    const floorGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const floorGlowMesh = new THREE.Mesh(floorGlowGeo, floorGlowMat)
    floorGlowMesh.rotation.x = -Math.PI / 2
    scene.add(floorGlowMesh)

    // Animated Mist / Fog System flowing up from the floor pedestal
    const mistGroup = new THREE.Group()
    scene.add(mistGroup)

    const mistTexture = createMistTexture()
    const MIST_COUNT = 40
    const mistParticles: MistParticle[] = []

    let currentMistRiseHeight = 1.0
    let currentMistSpreadWidth = 1.8

    for (let i = 0; i < MIST_COUNT; i++) {
      const mat = new THREE.SpriteMaterial({
        map: mistTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0,
      })
      const sprite = new THREE.Sprite(mat)
      mistGroup.add(sprite)

      mistParticles.push({
        sprite,
        material: mat,
        offsetX: (Math.random() - 0.5) * 1.8,
        z: (Math.random() - 0.5) * 0.8,
        y: -1.2 + Math.random() * 1.0,
        speedY: 0.12 + Math.random() * 0.16,
        swayAmp: 0.04 + Math.random() * 0.06,
        swayFreq: 0.8 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        scaleBase: 0.16 + Math.random() * 0.18,
        maxOpacity: 0.09 + Math.random() * 0.12,
      })
    }

    let disposed = false
    let loadedScene: THREE.Object3D | undefined
    let reflectionScene: THREE.Object3D | undefined
    let animationMixer: THREE.AnimationMixer | undefined
    let reflectionMixer: THREE.AnimationMixer | undefined
    let scrollTimeline: gsap.core.Timeline | undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Target tracking values for alignment
    let currentModelDiam = 1
    let currentFloorWorldY = -1.2
    let currentModelWorldX = 0
    let currentModelWorldY = 0

    const resize = () => {
      const introEl = stage.closest('.intro') as HTMLElement | null
      const container = introEl || stage
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return

      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      // Calculate camera visible frustum at z = 0
      const vFovRad = (32 * Math.PI) / 180
      const worldH = 2 * 4.8 * Math.tan(vFovRad / 2)
      const worldW = worldH * camera.aspect

      const refRect = container.getBoundingClientRect()
      const stageRect = stage.getBoundingClientRect()

      // Detect mobile layout (<= 800px)
      const isMobile = window.matchMedia('(max-width: 800px)').matches

      let renderedW: number
      let renderedH: number
      let imgLeft: number
      let imgTop: number

      if (isMobile) {
        // about_mobile.png native dimensions: 941 x 1672 (aspect ratio: 0.562799)
        const imgAspect = 941 / 1672
        if (refRect.width / refRect.height > imgAspect) {
          renderedW = refRect.width
          renderedH = refRect.width / imgAspect
          imgLeft = 0
          imgTop = (refRect.height - renderedH) / 2
        } else {
          renderedH = refRect.height
          renderedW = refRect.height * imgAspect
          imgTop = 0
          imgLeft = (refRect.width - renderedW) / 2
        }

        // In about_mobile.png:
        // Portal center: X = 50% (470.5/941), Y = 55.98% (936/1672)
        // Portal diameter: 61.21% of image width (576/941)
        // Floor pedestal: Y = 73.8% (1235/1672)
        const circleX_ref = imgLeft + renderedW * 0.5
        const circleY_ref = imgTop + renderedH * 0.5598
        const circleDiam_px = renderedW * 0.6121
        const floorY_ref = imgTop + renderedH * 0.738

        const targetX_stage = circleX_ref - (stageRect.left - refRect.left)
        const targetY_stage = circleY_ref - (stageRect.top - refRect.top)
        const floorY_stage = floorY_ref - (stageRect.top - refRect.top)

        const dx_px = targetX_stage - stageRect.width / 2
        const dy_px = stageRect.height / 2 - targetY_stage
        currentModelWorldX = (dx_px / stageRect.width) * worldW
        currentModelWorldY = (dy_px / stageRect.height) * worldH

        const dy_floor_px = stageRect.height / 2 - floorY_stage
        currentFloorWorldY = (dy_floor_px / stageRect.height) * worldH

        // Mobile model scale: 70% of circular portal diameter (natural, comfortable floating fit)
        const targetModelDiam_px = circleDiam_px * 0.70
        currentModelDiam = (targetModelDiam_px / stageRect.height) * worldH

        const floorDiscScale = (circleDiam_px * 0.85 / stageRect.height) * worldH
        floorGlowMesh.scale.set(floorDiscScale, floorDiscScale * 0.28, 1)
      } else {
        // about.png native dimensions: 1536 x 1024 (aspect ratio: 1.5)
        const imgAspect = 1536 / 1024
        if (refRect.width / refRect.height > imgAspect) {
          renderedW = refRect.width
          renderedH = refRect.width / imgAspect
          imgLeft = 0
          imgTop = (refRect.height - renderedH) / 2
        } else {
          renderedH = refRect.height
          renderedW = refRect.height * imgAspect
          imgTop = 0
          imgLeft = (refRect.width - renderedW) / 2
        }

        // In about.png:
        // Portal center: X = 50% (768/1536), Y = 46.2% (473/1024)
        // Portal diameter: 50.78% of image height (520/1024)
        // Floor pedestal: Y = 78.5% (804/1024)
        const circleX_ref = imgLeft + renderedW * 0.5
        const circleY_ref = imgTop + renderedH * 0.462
        const circleDiam_px = renderedH * 0.5078
        const floorY_ref = imgTop + renderedH * 0.785

        const targetX_stage = circleX_ref - (stageRect.left - refRect.left)
        const targetY_stage = circleY_ref - (stageRect.top - refRect.top)
        const floorY_stage = floorY_ref - (stageRect.top - refRect.top)

        const dx_px = targetX_stage - stageRect.width / 2
        const dy_px = stageRect.height / 2 - targetY_stage
        currentModelWorldX = (dx_px / stageRect.width) * worldW
        currentModelWorldY = (dy_px / stageRect.height) * worldH

        const dy_floor_px = stageRect.height / 2 - floorY_stage
        currentFloorWorldY = (dy_floor_px / stageRect.height) * worldH

        const targetModelDiam_px = circleDiam_px * 0.76
        currentModelDiam = (targetModelDiam_px / stageRect.height) * worldH

        const floorDiscScale = (circleDiam_px * 0.76 / stageRect.height) * worldH
        floorGlowMesh.scale.set(floorDiscScale, floorDiscScale * 0.28, 1)
      }

      // Position and scale main model
      modelGroup.position.set(currentModelWorldX, currentModelWorldY, 0)
      modelGroup.scale.setScalar(currentModelDiam)

      // Bring reflection closer to the 3D model: place reflection plane right below the model
      const distAboveFloor = currentModelDiam * 0.43
      currentFloorWorldY = currentModelWorldY - distAboveFloor

      // Position mirror container at floor plane
      mirrorContainer.position.set(0, currentFloorWorldY, 0)
      mirrorContainer.scale.set(1, -1, 1)

      // Position reflection relative to mirrorContainer (local Y points downward)
      reflectionGroup.position.set(currentModelWorldX, distAboveFloor, 0)
      reflectionGroup.scale.setScalar(currentModelDiam)

      // Clip plane at floor level
      floorClipPlane.constant = currentFloorWorldY + 0.02

      // Position floor contact glow disc on the pedestal
      floorGlowMesh.position.set(currentModelWorldX, currentFloorWorldY + 0.005, 0)

      // Align lights
      portalGlow.position.set(currentModelWorldX, currentModelWorldY, -0.6)
      floorUplight.position.set(currentModelWorldX, currentFloorWorldY + 0.15, 0)

      // Update mist emission bounds (from floor level rising upward around the model)
      currentMistRiseHeight = Math.max(0.55, currentModelDiam * 1.05)
      currentMistSpreadWidth = Math.max(1.1, currentModelDiam * 1.5)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    const introSection = stage.closest('.intro')
    if (introSection) observer.observe(introSection)
    window.addEventListener('resize', resize)
    resize()

    const mainActions: THREE.AnimationAction[] = []
    const reflActions: THREE.AnimationAction[] = []

    preloadGearModel()
      .then((gltf) => {
        if (disposed) return

        // 1. Setup main model
        loadedScene = clone(gltf.scene)
        const bounds = new THREE.Box3().setFromObject(loadedScene)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z) || 1
        const unitScale = 1.0 / maxDim

        loadedScene.scale.setScalar(unitScale)
        loadedScene.position.copy(center).multiplyScalar(-unitScale)
        modelGroup.add(loadedScene)

        // Material pass on main model
        loadedScene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.material = child.material.clone()
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.metalness = 0.7
              child.material.roughness = 0.22
            }
          }
        })

        // 2. Setup reflection model (subtle, glossy floor sheen)
        reflectionScene = clone(gltf.scene)
        reflectionScene.scale.setScalar(unitScale)
        reflectionScene.position.copy(center).multiplyScalar(-unitScale)
        reflectionGroup.add(reflectionScene)

        reflectionScene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.material = child.material.clone()
            child.material.transparent = true
            child.material.opacity = 0.24
            child.material.side = THREE.DoubleSide
            child.material.clippingPlanes = [floorClipPlane]
            child.material.clipShadows = true
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.metalness = 0.75
              child.material.roughness = 0.42
              if (child.material.color) {
                child.material.color.lerp(new THREE.Color(0x0284c7), 0.55)
              }
            }
          }
        })

        // Base tilt: angles the gears toward camera so circular face fits circle
        const baseRotX = THREE.MathUtils.degToRad(-70)
        modelGroup.rotation.set(baseRotX, -0.55, -0.1)
        reflectionGroup.rotation.copy(modelGroup.rotation)

        // Animation mixer for internal gear motion
        if (gltf.animations.length) {
          animationMixer = new THREE.AnimationMixer(loadedScene)
          reflectionMixer = new THREE.AnimationMixer(reflectionScene)

          gltf.animations.forEach((clip) => {
            const a1 = animationMixer?.clipAction(clip)
            const a2 = reflectionMixer?.clipAction(clip)
            if (a1 && a2) {
              a1.setLoop(THREE.LoopOnce, 1)
              a1.clampWhenFinished = true
              a1.play()
              a1.paused = true
              mainActions.push(a1)

              a2.setLoop(THREE.LoopOnce, 1)
              a2.clampWhenFinished = true
              a2.play()
              a2.paused = true
              reflActions.push(a2)
            }
          })
          animationMixer.update(0)
          reflectionMixer.update(0)
        }

        stage.classList.add('is-loaded')
        resize()

        // ScrollTrigger interactive scrub
        if (!reduceMotion) {
          const animationState = { progress: 0 }
          const triggerTarget = stage.closest('.intro') || stage

          scrollTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: triggerTarget,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          })

          scrollTimeline.to(animationState, {
            progress: 1,
            ease: 'none',
            onUpdate: () => {
              scrollRotRef.current = animationState.progress * Math.PI * 2.35
              mainActions.forEach((action) => {
                action.time = action.getClip().duration * animationState.progress
              })
              reflActions.forEach((action) => {
                action.time = action.getClip().duration * animationState.progress
              })
              animationMixer?.update(0)
              reflectionMixer?.update(0)
            },
          }, 0)
        }
      })
      .catch(() => {
        if (!disposed) stage.classList.add('has-error')
      })

    const clock = new THREE.Clock()
    const scrollRotRef = { current: 0 }
    let idleRot = 0

    // Continuous 60fps render loop with gentle idle rotation, synchronized reflection, and animated rising mist
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1)

      if (!reduceMotion) {
        idleRot += delta * 0.18

        // Animated mist/fog flowing up from floor pedestal (yellow marker area)
        const time = clock.getElapsedTime()
        mistParticles.forEach((p) => {
          p.y += p.speedY * delta
          const progress = (p.y - currentFloorWorldY) / currentMistRiseHeight
          if (progress >= 1.0) {
            p.y = currentFloorWorldY + Math.random() * 0.04
            p.offsetX = (Math.random() - 0.5) * currentMistSpreadWidth
            p.z = (Math.random() - 0.5) * 0.8
          }
          const sway = Math.sin(time * p.swayFreq + p.phase) * p.swayAmp
          p.sprite.position.set(currentModelWorldX + p.offsetX + sway, p.y, p.z)

          const curScale = p.scaleBase * (1.0 + progress * 1.2)
          p.sprite.scale.set(curScale, curScale * 0.75, 1)

          // Smooth bell-curve alpha: emerges from floor pedestal, peaks at yellow marker line, gently disperses
          let alpha = 0
          if (progress < 0.28) {
            alpha = (progress / 0.28) * p.maxOpacity
          } else {
            alpha = Math.max(0, 1.0 - (progress - 0.28) / 0.72) * p.maxOpacity
          }
          p.material.opacity = alpha
        })
      }

      // Synchronize rotation between main moving model and floor reflection
      const currentRotY = -0.55 + idleRot + scrollRotRef.current
      modelGroup.rotation.y = currentRotY
      reflectionGroup.rotation.y = currentRotY

      // Idle gear movements when not actively scrolling
      if (!reduceMotion && animationMixer && reflectionMixer && mainActions.length) {
        animationMixer.update(delta * 0.25)
        reflectionMixer.update(delta * 0.25)
      }

      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    return () => {
      disposed = true
      window.removeEventListener('resize', resize)
      observer.disconnect()
      scrollTimeline?.scrollTrigger?.kill()
      scrollTimeline?.kill()
      renderer.setAnimationLoop(null)
      if (loadedScene) animationMixer?.uncacheRoot(loadedScene)
      if (reflectionScene) reflectionMixer?.uncacheRoot(reflectionScene)
      mistTexture.dispose()
      mistParticles.forEach((p) => {
        p.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div className="pump-model-stage" ref={stageRef}>
      <canvas
        ref={canvasRef}
        aria-label="Animated three-dimensional gear model inside futuristic portal with reflection and mist"
        role="img"
      />
    </div>
  )
}
