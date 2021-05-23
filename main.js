import "./style.css";

import thomasImg from "./thomas.png";
import moonImg from "./moon.jpg";
import normalImg from "./normal.jpg";
import spaceImg from "./space.jpg";

import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// =========== Creating the scene - container ====
const scene = new THREE.Scene();

//============ Creating camera ============
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// ================ Creating renderer ==================
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//============== Creating Geometry (geometry+material) ===========
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//============== Creating Lights ====================
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// ================  Creating Helpers ==================
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// const controls = new OrbitControls(camera, renderer.domElement);

// scene.add(lightHelper, gridHelper);

//============= Creating starts ================
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//  =========== adding background =================

const spaceTexture = new THREE.TextureLoader().load(spaceImg);
scene.background = spaceTexture;

// ============== AVATAR ===================

const thomasTexture = new THREE.TextureLoader().load(thomasImg);

const thomas = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: thomasTexture })
);

scene.add(thomas);

// ================ MOON ================

const moonTexture = new THREE.TextureLoader().load(moonImg);
const normalTexture = new THREE.TextureLoader().load(normalImg);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-15);

thomas.position.z = -5;
thomas.position.x = 2;

// Move camera function

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  thomas.rotation.y += 0.01;
  thomas.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0001;
  camera.rotation.y = t * -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

//===== Function to generate object and movement ======
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
