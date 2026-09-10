import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC = '/vid/erwat-hq-network.mp4'
const VIDEO_FALLBACK_SRC = '/vid/output%20(1).mp4'

export default function ErwatNetworkReveal() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!stage || !canvas || !video) return

    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    video.crossOrigin = 'anonymous'

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 2.8)

    // Soft ambient
    scene.add(new THREE.HemisphereLight(0xcfe9ff, 0x0a1a2a, 1.4))

    // Groups for parallax
    const videoGroup = new THREE.Group()
    scene.add(videoGroup)

    let videoTexture: THREE.VideoTexture | null = null
    let videoMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null
    let gridMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null
    let vFov = camera.fov
    let baseScale = 1
    let disposed = false
    let scrollTimeline: gsap.core.Timeline | undefined
    const scrubProxy = { progress: 0 }
    let duration = 0
    let videoAspect = 16 / 9
    let geomW = 3.6
    let geomH = geomW / videoAspect
    const overlayIntensity = { value: 0 }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const createVideoPlane = () => {
      // cleanup previous
      if (videoMesh) {
        videoGroup.remove(videoMesh)
        videoMesh.geometry.dispose()
        videoMesh.material.dispose()
      }
      if (gridMesh) {
        videoGroup.remove(gridMesh)
        gridMesh.geometry.dispose()
        gridMesh.material.dispose()
      }
      if (videoTexture) videoTexture.dispose()

      videoTexture = new THREE.VideoTexture(video)
      videoTexture.colorSpace = THREE.SRGBColorSpace
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.generateMipmaps = false

      geomW = 3.6
      geomH = 3.6 / videoAspect
      const geom = new THREE.PlaneGeometry(geomW, geomH)

      const mat = new THREE.MeshBasicMaterial({ map: videoTexture })
      videoMesh = new THREE.Mesh(geom, mat)
      videoMesh.position.z = 0
      videoGroup.add(videoMesh)

      // subtle grid wireframe overlay - gives three.js depth without obscuring video
      const gridGeom = new THREE.PlaneGeometry(geomW, geomH, 12, 12)
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0x16b9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.0,
      })
      gridMesh = new THREE.Mesh(gridGeom, gridMat)
      gridMesh.position.z = 0.02
      videoGroup.add(gridMesh)

      updateCover()
      if (!disposed) setIsReady(true)
      stage.classList.add('is-loaded')
    }

    const updateCover = () => {
      if (!videoMesh || !gridMesh) return
      const { width, height } = stage.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      vFov = camera.fov

      const dist = camera.position.z
      const worldH = 2 * Math.tan(THREE.MathUtils.degToRad(vFov) / 2) * dist
      const worldW = worldH * camera.aspect

      const coverScale = Math.max(worldW / geomW, worldH / geomH) * 1.02
      baseScale = coverScale
      // apply current scrub scale on top
      const extra = 1 + scrubProxy.progress * 0.14
      videoGroup.scale.set(baseScale * extra, baseScale * extra, 1)
      // subtle vertical parallax
      videoGroup.position.y = scrubProxy.progress * -0.06 * baseScale
    }

    const resize = () => updateCover()
    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    resize()

    const onLoadedMeta = () => {
      if (disposed) return
      if (video.videoWidth && video.videoHeight) {
        videoAspect = video.videoWidth / video.videoHeight
      }
      duration = video.duration || 0
      createVideoPlane()

      if (reduceMotion) {
        // simple muted autoplay loop for reduced motion
        video.loop = true
        video.muted = true
        video.currentTime = 0
        video.play().catch(() => {})
        if (gridMesh) gridMesh.material.opacity = 0.08
        return
      }

      // scroll-scrub mode: pause video, timeline drives currentTime
      video.pause()
      video.currentTime = 0
      scrubProxy.progress = 0

      // Build scroll timeline mirroring ScrollPumpModel pattern
      // trigger: stage, scrub 1.1, invalidateOnRefresh
      scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 78%',
          end: 'bottom 5%',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      })

      // progress drives video time via onUpdate
      scrollTimeline.to(scrubProxy, {
        progress: 1,
        ease: 'none',
        onUpdate: () => {
          if (!duration) return
          const t = THREE.MathUtils.clamp(scrubProxy.progress, 0, 0.999)
          const target = duration * t
          // avoid seeking beyond buffered unexpectedly — clamp and set directly
          if (Math.abs(video.currentTime - target) > 0.015) {
            try {
              video.currentTime = target
            } catch {
              // ignore seek errors while loading
            }
          }
          // three.js parallax / zoom tied to same progress
          const extra = 1 + scrubProxy.progress * 0.14
          videoGroup.scale.set(baseScale * extra, baseScale * extra, 1)
          videoGroup.position.y = scrubProxy.progress * -0.06 * baseScale
          // gentle rotation for depth
          videoGroup.rotation.z = scrubProxy.progress * 0.015
          overlayIntensity.value = scrubProxy.progress
          if (gridMesh) {
            gridMesh.material.opacity = 0.015 + scrubProxy.progress * 0.11
          }
          if (videoTexture) videoTexture.needsUpdate = true
        },
      }, 0)

      // also fade overlay grid element via CSS progress var for DOM overlay
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: true,
        onUpdate: (self) => {
          stage.style.setProperty('--erwat-progress', String(self.progress.toFixed(3)))
        },
      })
    }

    const onCanPlay = () => {
      // ensure first frame rendered
      if (videoTexture) videoTexture.needsUpdate = true
    }

    const onError = () => {
      if (disposed) return
      // try fallback src if primary fails
      const isFallback = video.currentSrc.includes('output')
      if (!isFallback && VIDEO_FALLBACK_SRC) {
        video.src = VIDEO_FALLBACK_SRC
        video.load()
        return
      }
      setHasError(true)
      stage.classList.add('has-error')
    }

    video.addEventListener('loadedmetadata', onLoadedMeta)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('error', onError)

    // If metadata already loaded (cached), trigger manually
    if (video.readyState >= 1) {
      // delay to allow effect setup
      window.setTimeout(() => {
        if (video.videoWidth) onLoadedMeta()
      }, 0)
    }
    // Ensure load starts — JSX already sets src, just ensure it loads
    if (video.readyState === 0) video.load()

    // Pin-like scrub already handled; no extra pin to avoid layout shift — scrub alone matches home page pump model
    // Render loop — keeps VideoTexture mapping live even when scrubbing
    renderer.setAnimationLoop(() => {
      if (videoTexture && !video.paused && !reduceMotion) {
        // when scrubbing, videoTexture updates via onUpdate; no need per-frame
      } else if (videoTexture && !video.paused) {
        videoTexture.needsUpdate = true
      } else if (videoTexture && reduceMotion === false) {
        // even when paused, scrub timeline updates texture via onUpdate, still render
        videoTexture.needsUpdate = true
      }
      renderer.render(scene, camera)
    })

    const handleVisibility = () => {
      if (document.hidden) video.pause()
      else if (reduceMotion) video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      disposed = true
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', handleVisibility)
      scrollTimeline?.scrollTrigger?.kill()
      scrollTimeline?.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === stage) st.kill()
      })
      observer.disconnect()
      renderer.setAnimationLoop(null)
      video.pause()
      if (videoTexture) videoTexture.dispose()
      if (videoMesh) {
        videoMesh.geometry.dispose()
        if (videoMesh.material.map) videoMesh.material.map.dispose()
        videoMesh.material.dispose()
      }
      if (gridMesh) {
        gridMesh.geometry.dispose()
        gridMesh.material.dispose()
      }
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = isMuted
  }, [isMuted])

  return (
    <div
      className={`erwat-network-stage${isReady ? ' is-loaded' : ''}${hasError ? ' has-error' : ''}`}
      ref={stageRef}
      data-erwat-reveal
    >
      <canvas
        ref={canvasRef}
        aria-label="ERWAT HQ wastewater network control — muted video with scroll-driven playback"
        role="img"
      />
      {/* Hidden video source for VideoTexture — kept in DOM for preload and accessibility */}
      <video
        ref={videoRef}
        className="erwat-network-video-source"
        src={VIDEO_SRC}
        muted={isMuted}
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        aria-hidden="true"
        tabIndex={-1}
        webkit-playsinline="true"
        controls={false}
      />
      {/* DOM overlays — parallax grid, scan, metadata — mirrors engineering-diagram styling */}
      <div className="erwat-network-shade" aria-hidden="true" />
      <div className="erwat-network-grid" aria-hidden="true" />
      <div className="erwat-network-scan" aria-hidden="true" />
      <div className="erwat-network-topbar" aria-hidden="true">
        <span>ERWAT / NETWORK CONTROL</span>
        <span>HQ FEED · KEMPTON PARK</span>
      </div>
      <div className="erwat-network-bottombar" aria-hidden="true">
        <span><i /> LIVE NETWORK FEED</span>
        <span>26°07′S · 28°14′E</span>
      </div>
      <button
        type="button"
        className="erwat-mute-toggle"
        onClick={() => setIsMuted((m) => !m)}
        aria-label={isMuted ? 'Unmute ERWAT network video' : 'Mute ERWAT network video'}
        aria-pressed={!isMuted}
      >
        {/* simple mute icon using text — keeps bundle lean, matches site ui */}
        <span aria-hidden="true">{isMuted ? '◯ Unmute' : '● Muted'}</span>
        <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
      </button>
      <div className="erwat-network-fallback" aria-hidden={!hasError}>
        {hasError ? 'Video unavailable' : 'Loading network feed…'}
      </div>
    </div>
  )
}
