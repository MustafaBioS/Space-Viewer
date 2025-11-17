import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStars from "./stars.js";

const start = document.querySelector('.start');

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

sunGroup.scale.setScalar(2);

// Mercury

const mercGeo = new THREE.IcosahedronGeometry(1, 12);
const mercMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/mercury/8k_mercury.jpg")
})

const mercGroup = new THREE.Group();
scene.add(mercGroup);

const mercMesh = new THREE.Mesh(mercGeo, mercMat);
mercGroup.add(mercMesh);

mercGroup.scale.setScalar(0.76);


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

venGroup.scale.setScalar(1.9);

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

earthGroup.scale.setScalar(2);

// Moon

const moonGeo = new THREE.IcosahedronGeometry(1, 12);
const moonMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/moon/8k_moon.jpg")
})

const moonGroup = new THREE.Group();
scene.add(moonGroup);

const moonMesh = new THREE.Mesh(moonGeo, moonMat);
moonGroup.add(moonMesh);

moonGroup.scale.setScalar(0.54)

// Mars

const marsGeo = new THREE.IcosahedronGeometry(1, 12);
const marsMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/mars/8k_mars.jpg')
})

const marsGroup = new THREE.Group();
scene.add(marsGroup);

const marsMesh = new THREE.Mesh(marsGeo, marsMat);
marsGroup.add(marsMesh)

marsGroup.scale.setScalar(1.06);

// Jupiter

const jupGeo = new THREE.IcosahedronGeometry(1, 12);
const jupMat = new THREE.MeshBasicMaterial({
    map: loader.load('static/maps/jupiter/8k_jupiter.jpg')
})

const jupGroup = new THREE.Group();
scene.add(jupGroup);

const jupMesh = new THREE.Mesh(jupGeo, jupMat);
jupGroup.add(jupMesh);

jupGroup.scale.setScalar(5);

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

satGroup.scale.setScalar(4);

// Uranus

const urGeo = new THREE.IcosahedronGeometry(1, 12);
const urMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/uranus/2k_uranus.jpg")
})

const urGroup = new THREE.Group();
scene.add(urGroup)

const urMesh = new THREE.Mesh(urGeo, urMat);
urGroup.add(urMesh);

urGroup.scale.setScalar(3);

// Neptune

const nepGeo = new THREE.IcosahedronGeometry(1, 12);
const nepMat = new THREE.MeshBasicMaterial({
    map: loader.load("static/maps/neptune/2k_neptune.jpg")
})

const nepGroup = new THREE.Group();
scene.add(nepGroup);

const nepMesh = new THREE.Mesh(nepGeo, nepMat);
nepGroup.add(nepMesh);

nepGroup.scale.setScalar(2.8)

// Positions

nepGroup.position.x = 62;
urGroup.position.x = 54;
satGroup.position.x = 42;
jupGroup.position.x = 27;
marsGroup.position.x = 20;
moonGroup.position.x = 20;
earthGroup.position.x = 13.5;
venGroup.position.x = 8;
mercGroup.position.x = 4;


// Pivots

const mercPivot = new THREE.Group();
scene.add(mercPivot);
mercPivot.add(mercGroup);

const venPivot = new THREE.Group();
scene.add(venPivot);
venPivot.add(venGroup);

const earthPivot = new THREE.Group();
scene.add(earthPivot);
earthPivot.add(earthGroup);

const moonPivot = new THREE.Group();
earthGroup.add(moonPivot);
moonPivot.add(moonGroup);
moonGroup.position.set(1.7, 0, 0);

const marsPivot = new THREE.Group();
scene.add(marsPivot);
marsPivot.add(marsGroup);

const jupPivot = new THREE.Group();
scene.add(jupPivot);
jupPivot.add(jupGroup);

const satPivot = new THREE.Group();
scene.add(satPivot);
satPivot.add(satGroup);

const urPivot = new THREE.Group();
scene.add(urPivot);
urPivot.add(urGroup);

const nepPivot = new THREE.Group();
scene.add(nepPivot);
nepPivot.add(nepGroup);


// Orbits

function createOrbit(radius) {
    const segments = 128;
    const geometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, segments);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI / 2;
    return ring;
}

scene.add(createOrbit(4));
scene.add(createOrbit(8));
scene.add(createOrbit(13.5));
scene.add(createOrbit(20));
scene.add(createOrbit(27));
scene.add(createOrbit(42));
scene.add(createOrbit(54));
scene.add(createOrbit(62));


const controls = new OrbitControls(cam, renderer.domElement);

function move() {

    // Around The Sun
    
    mercPivot.rotation.y += 0.004;
    venPivot.rotation.y += 0.0016;
    earthPivot.rotation.y += 0.001;
    moonPivot.rotation.y += 0.01;
    marsPivot.rotation.y += 0.0008;
    jupPivot.rotation.y += 0.0002;
    satPivot.rotation.y += 0.00009;
    urPivot.rotation.y += 0.00004;
    nepPivot.rotation.y += 0.00002;
}

var moving = false;

start.addEventListener('click', ()=> {
    if (!moving) {
        moving = true;
    } else if (moving) {
        moving = false;  
    }
})

function animate() {
    requestAnimationFrame(animate);
    
    // Around Itself

    nepGroup.rotation.y += 0.00298;
    urGroup.rotation.y += -0.00278;
    satGroup.rotation.y += 0.00444;
    jupGroup.rotation.y += 0.00488;
    marsGroup.rotation.y += 0.00194;
    moonGroup.rotation.y += 0.000074;

    earthMesh.rotation.y += 0.002;
    lightMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0025;

    venGroup.rotation.y = -0.00008;
    mercGroup.rotation.y += 0.00034;
    sunGroup.rotation.y += 0.002;

    if (moving) {
        move();
    }


    renderer.render(scene, cam);
}

animate();