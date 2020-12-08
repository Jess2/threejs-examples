import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const figures = [
        makeInstance(new THREE.BoxBufferGeometry(10, 10, 10), 0x44aa88,  0),
        makeInstance(new THREE.CircleBufferGeometry(5, 100), 0xaa8844,  20),
        makeInstance(new THREE.ConeBufferGeometry(5, 10, 100), 0xe0e0e0,  -20),
        makeInstance(new THREE.CylinderBufferGeometry(5, 5, 10, 100), 0x103893,  40),
        makeInstance(new THREE.DodecahedronBufferGeometry(5), 0x554543,  -40),
        makeInstance(new THREE.DodecahedronBufferGeometry(5, 10), 0x333233,  60),
    ];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        figures.forEach((figure, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            figure.rotation.x = rot;
            figure.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
