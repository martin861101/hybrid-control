import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const loader = new GLTFLoader()
loader.setMeshoptDecoder(MeshoptDecoder)

const modelUrl = import.meta.env.BASE_URL + '3d/hc.glb'

const gearModelPromise = new Promise<GLTF>((resolve, reject) => {
  loader.load(modelUrl, resolve, undefined, reject)
})

export function preloadGearModel() {
  return gearModelPromise
}
