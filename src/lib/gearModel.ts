import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gearModelUrl = new URL('../../gearanimated.glb', import.meta.url).href

const gearModelPromise = new Promise<GLTF>((resolve, reject) => {
  new GLTFLoader().load(gearModelUrl, resolve, undefined, reject)
})

export function preloadGearModel() {
  return gearModelPromise
}
