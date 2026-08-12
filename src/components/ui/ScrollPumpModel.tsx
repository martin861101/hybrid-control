import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { preloadGearModel } from '../../lib/gearModel'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollPumpModel() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100)
    camera.position.set(0, .15, 4.8)

    const modelGroup = new THREE.Group()
    modelGroup.rotation.set(-.18, -.55, -.1)
    scene.add(modelGroup)

    scene.add(new THREE.HemisphereLight(0xc9efff, 0x18304a, 2.6))
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x168cff, 5)
    rimLight.position.set(-5, 1, -3)
    scene.add(rimLight)

    let disposed = false
    let loadedScene: THREE.Object3D | undefined
    let animationMixer: THREE.AnimationMixer | undefined
    let scrollTween: gsap.core.Tween | undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = Math.max(4.8, 4.8 / Math.max(camera.aspect, .65))
      camera.updateProjectionMatrix()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    resize()

    preloadGearModel()
      .then((gltf) => {
        if (disposed) return

        loadedScene = clone(gltf.scene)
        const bounds = new THREE.Box3().setFromObject(loadedScene)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const scale = 2.65 / Math.max(size.x, size.y, size.z)

        loadedScene.scale.setScalar(scale)
        loadedScene.position.copy(center).multiplyScalar(-scale)
        modelGroup.add(loadedScene)

        if (gltf.animations.length) {
          animationMixer = new THREE.AnimationMixer(loadedScene)
          gltf.animations.forEach((clip) => {
            const action = animationMixer?.clipAction(clip)
            action?.setLoop(THREE.LoopRepeat, Infinity)
            action?.play()
          })
        }
        stage.classList.add('is-loaded')

        if (!reduceMotion) {
          scrollTween = gsap.to(modelGroup.rotation, {
            y: modelGroup.rotation.y + Math.PI * 2.35,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 88%',
              end: 'bottom 12%',
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          })
        }
      })
      .catch(() => {
        if (!disposed) stage.classList.add('has-error')
      })

    const clock = new THREE.Clock()
    renderer.setAnimationLoop(() => {
      animationMixer?.update(Math.min(clock.getDelta(), .1))
      renderer.render(scene, camera)
    })

    return () => {
      disposed = true
      scrollTween?.scrollTrigger?.kill()
      scrollTween?.kill()
      observer.disconnect()
      renderer.setAnimationLoop(null)
      if (loadedScene) animationMixer?.uncacheRoot(loadedScene)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="pump-model-stage" ref={stageRef}>
      <canvas ref={canvasRef} aria-label="Animated three-dimensional sci-fi gear model" />
    </div>
  )
}
