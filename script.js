const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding; // Ensure correct color encoding

// Set the camera position to match the Sketchfab view
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

// Add ambient light and directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Load the GLB model with textures and materials
const loader = new THREE.GLTFLoader();
loader.load('model/house.glb', function (gltf) {
    const house = gltf.scene;
    scene.add(house);

    house.position.set(0, 0, 0);
    house.scale.set(1, 1, 1);

    // Ensure materials are correctly applied
    house.traverse((child) => {
        if (child.isMesh) {
            child.material.needsUpdate = true; // Update material
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    let selectedWall = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(house.children, true);

        if (intersects.length > 0) {
            selectedWall = intersects[0].object;
            console.log('Selected wall:', selectedWall.name);
        }
    }

    window.addEventListener('click', onMouseClick);

    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function () {
            if (selectedWall) {
                const color = this.getAttribute('data-color');
                selectedWall.material.color.set(color);
            }
        });
    });

}, undefined, function (error) {
    console.error('An error happened while loading the model:', error);
});
