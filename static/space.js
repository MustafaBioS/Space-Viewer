import * as THREE from "three";

const h = window.innerHeight;
const w = window.innerWidth;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const cam = new THREE.PerspectiveCamera(fov, aspect, near, far)
cam.position.z = 2;

const scene = new THREE.Scene();


renderer.render(scene, cam);