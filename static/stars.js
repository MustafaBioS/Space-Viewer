import * as THREE from "three";

export default function getStars(num = 5000) {
    const verts = [];
    const colors = [];

    for (let i = 0; i < num; i++) {
        const radius = Math.random() * 25 + 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        verts.push(x, y, z);

        const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
        colors.push(col.r, col.g, col.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        depthWrite: false
    });

    return new THREE.Points(geo, mat);
}
