import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
//renderer.setClearColor(0x4b4b55)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10)
camera.position.set(1.5,0.2,0.3)


const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enablePan = false;
orbit.enableZoom = false;
orbit.enableRotate = true;
orbit.enableRotateX = false
orbit.update();

const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()

renderer.ooutputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 4;


rgbeLoader.load('blue_lagoon_night_1k.hdr', function(texture){
  texture.mapping = THREE.EquirectangularRefractionMapping
  scene.environment = texture

  gltfLoader.load('scene.gltf', function(gltf) {
    const model = gltf.scene
    model.position.x = 0
    model.position.y = 0
    model.position.z = 0
    model.rotation.x = 0
    model.rotation.y = 0
    model.rotation.z = 0
    const boundingBox = new THREE.Box3().setFromObject(model);
const center = new THREE.Vector3();
boundingBox.getCenter(center);

model.position.sub(center);
    scene.add(model)
  })
})

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()