import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gearModelUrl = new URL('../../sci_fi_gear_animated.glb', import.meta.url).href
const progressListeners = new Set<(progress: number) => void>()
let currentProgress = 0

function publishProgress(progress: number) {
  currentProgress = progress
  progressListeners.forEach((listener) => listener(progress))
}

const gearModelPromise = new Promise<GLTF>((resolve, reject) => {
  new GLTFLoader().load(
    gearModelUrl,
    (gltf) => {
      publishProgress(1)
      resolve(gltf)
    },
    (event) => {
      if (event.total > 0) publishProgress(Math.min((event.loaded / event.total) * .92, .92))
    },
    (error) => {
      publishProgress(1)
      reject(error)
    },
  )
})

export function preloadGearModel() {
  return gearModelPromise
}

export function subscribeToGearProgress(listener: (progress: number) => void) {
  progressListeners.add(listener)
  listener(currentProgress)
  return () => { progressListeners.delete(listener) }
}
