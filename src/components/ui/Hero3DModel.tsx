import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

export default function Hero3DModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setClearColor(0x000000, 0) // Transparent for CSS drop-shadow
      container.appendChild(renderer.domElement)
    } catch (e) {
      console.warn('Hero3DModel: WebGL initialization failed', e)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 4)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5)
    keyLight.position.set(2, 2, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x00d2ff, 2.0)
    fillLight.position.set(-5, 0, -2)
    scene.add(fillLight)

    let model: THREE.Object3D | null = null

    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)
    const modelUrl = import.meta.env.BASE_URL + '3d/hc.glb'
    loader.load(modelUrl, (gltf) => {
      model = gltf.scene
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z) || 1
      
      // Target scale to fit comfortably in view
      const scale = 2.2 / maxDim
      model.scale.setScalar(scale)
      model.position.sub(center.multiplyScalar(scale))
      
      // Apply materials if needed for better look
      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material = child.material.clone()
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = 0.6
            child.material.roughness = 0.3
          }
        }
      })

      // Add it inside a pivot group so it rotates around its center
      const pivot = new THREE.Group()
      pivot.add(model)
      scene.add(pivot)
      
      model = pivot // use pivot for animation
    }, undefined, (error) => {
      console.error('Error loading /3d/hc.glb:', error)
    })

    const clock = new THREE.Clock()

    const animate = () => {
      renderer.setAnimationLoop(() => {
        const delta = Math.min(clock.getDelta(), 0.1)
        if (model) {
          model.rotation.y += delta * 0.25 // Slowly auto-spin
        }
        renderer.render(scene, camera)
      })
    }
    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    
    const observer = new ResizeObserver(handleResize)
    observer.observe(container)

    return () => {
      observer.disconnect()
      renderer.setAnimationLoop(null)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        left: 'auto',
        right: '6%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '400px',
        height: '400px',
        zIndex: 10,
        filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6))',
        pointerEvents: 'none' // Don't block interactions with text/buttons
      }}
      className="hero-3d-model"
      aria-hidden="true"
    />
  )
}
