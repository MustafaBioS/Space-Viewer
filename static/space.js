import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStars from "./stars.js";

const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const cam = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
cam.position.z = 3;

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("static/maps/earthmap1k.jpg"),
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup)

const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshBasicMaterial({ 
    map: loader.load("static/maps/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
})
const lightMesh = new THREE.Mesh(geometry, lightMat)
earthGroup.add(lightMesh);

const stars = getStars();
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

const controls = new OrbitControls(cam, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    
    earthMesh.rotation.y += 0.002;
    lightMesh.rotation.y += 0.002;
    renderer.render(scene, cam);
}
animate();
