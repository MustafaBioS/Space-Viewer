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


// Stars

const stars = getStars();
scene.add(stars);

// Sun

const sunGeo = new THREE.IcosahedronGeometry(1, 12);
const sunMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/sun/8k_sun.jpg'),
})

const sunGroup = new THREE.Group();
scene.add(sunGroup)

const sunMesh = new THREE.Mesh(sunGeo, sunMat);
sunGroup.add(sunMesh);

sunGroup.scale.setScalar(1.5)

// Mercury

const mercGeo = new THREE.IcosahedronGeometry(1, 12);
const mercMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/mercury/8k_mercury.jpg")
})

const mercGroup = new THREE.Group();
scene.add(mercGroup);

const mercMesh = new THREE.Mesh(mercGeo, mercMat);
mercGroup.add(mercMesh);


// Venus

const venGeo = new THREE.IcosahedronGeometry(1, 12);
const venMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/venus/8k_venus_surface.jpg')
})

const venGroup = new THREE.Group();
scene.add(venGroup);

const venMesh = new THREE.Mesh(venGeo, venMat);
venGroup.add(venMesh);

const venAtmoMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/venus/4k_venus_atmosphere.jpg"),
    transparent: true,
    opacity: 0.4,
    depthWrite: false
})

const venAtmoMesh = new THREE.Mesh(venGeo, venAtmoMat);
venGroup.add(venAtmoMesh);

// Earth

const earthGeo = new THREE.IcosahedronGeometry(1, 12);
const earthMat = new THREE.MeshStandardMaterial({
    map: loader.load("static/maps/earth/8k_earth_daymap.jpg"),
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup)

const earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthGroup.add(earthMesh);

const lightMat = new THREE.MeshBasicMaterial({ 
    map: loader.load("static/maps/earth/8k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.6
})
const lightMesh = new THREE.Mesh(earthGeo, lightMat)
lightMesh.scale.setScalar(1.001);
earthGroup.add(lightMesh);

const cloudsMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/earth/8k_earth_clouds.jpg"),
    transparent: true,
    opacity: 0.4,
    depthWrite: false
})

const cloudsMesh = new THREE.Mesh(earthGeo, cloudsMat);
cloudsMesh.scale.setScalar(1.002);
earthGroup.add(cloudsMesh);

const atmoMat = new THREE.MeshPhongMaterial({
    color: 0x00aaff,
    side: THREE.BackSide,
    opacity: 0.1,
    transparent: true
});
const atmoGeo = new THREE.SphereGeometry(1.02, 64, 64);
const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
earthGroup.add(atmosphere);

// Moon

const moonGeo = new THREE.IcosahedronGeometry(1, 12);
const moonMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/moon/8k_moon.jpg")
})

const moonGroup = new THREE.Group();
scene.add(moonGroup);

const moonMesh = new THREE.Mesh(moonGeo, moonMat);
moonGroup.add(moonMesh);

moonGroup.scale.setScalar(0.5)

// Mars

const marsGeo = new THREE.IcosahedronGeometry(1, 12);
const marsMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/mars/8k_mars.jpg')
})

const marsGroup = new THREE.Group();
scene.add(marsGroup);

const marsMesh = new THREE.Mesh(marsGeo, marsMat);
marsGroup.add(marsMesh)


// Jupiter

const jupGeo = new THREE.IcosahedronGeometry(1, 12);
const jupMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/jupiter/8k_jupiter.jpg')
})

const jupGroup = new THREE.Group();
scene.add(jupGroup);

const jupMesh = new THREE.Mesh(jupGeo, jupMat);
jupGroup.add(jupMesh);

// Saturn
const satGeo = new THREE.IcosahedronGeometry(1, 12);
const satMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/saturn/8k_saturn.jpg')
})

const satGroup = new THREE.Group();
scene.add(satGroup);

const satMesh = new THREE.Mesh(satGeo, satMat);
satGroup.add(satMesh);

function ring(inner, outer, texture) {
    const geometry = new THREE.RingGeometry(inner, outer, 128);

    const uv = geometry.attributes.uv;
    const pos = geometry.attributes.position;

    for (let i = 0; i < uv.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let radius = Math.sqrt(x * x + y * y);

        let u = (radius - inner) / (outer - inner);
        let v = (Math.atan2(y, x) + Math.PI) / (2 * Math.PI);

        uv.setXY(i, u, v);
    }

    geometry.attributes.uv.needsUpdate = true;

    return new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
        })
    );
}

const ringTex = loader.load("static/maps/saturn/8k_saturn_ring_alpha.png");
const ringMesh = ring(1.2, 2.2, ringTex);

ringMesh.rotation.x = Math.PI / 2;
satGroup.add(ringMesh);

// Uranus

const urGeo = new THREE.IcosahedronGeometry(1, 12);
const urMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/uranus/2k_uranus.jpg")
})

const urGroup = new THREE.Group();
scene.add(urGroup)

const urMesh = new THREE.Mesh(urGeo, urMat);
urGroup.add(urMesh);

// Neptune

const nepGeo = new THREE.IcosahedronGeometry(1, 12);
const nepMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/neptune/2k_neptune.jpg")
})

const nepGroup = new THREE.Group();
scene.add(nepGroup);

const nepMesh = new THREE.Mesh(nepGeo, nepMat);
nepGroup.add(nepMesh);

// Positions

nepGroup.position.x = 28;
urGroup.position.x = 25;
satGroup.position.x = 22;
jupGroup.position.x = 18;
marsGroup.position.x = 15;
mercGroup.position.x = 4;
venGroup.position.x = 7;
moonGroup.position.x = 13;
earthGroup.position.x = 10;

const controls = new OrbitControls(cam, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    
    earthMesh.rotation.y += 0.002;
    lightMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0025;

    renderer.render(scene, cam);
}

animate();
