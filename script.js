// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set camera position
camera.position.z = 5;

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Initialize the GLTFLoader
const loader = new THREE.GLTFLoader();

// Load the GLB model
loader.load('https://raw.githubusercontent.com/achuth07776/3d-house-model/main/white_hart_house.glb', function (gltf) {
    const house = gltf.scene;
    scene.add(house);

    // Optional: Adjust the initial position and scale of the house
    house.position.set(0, -1, 0);
    house.scale.set(1, 1, 1);

    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // User clicks to select a wall
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
            console.log('Selected wall:', selectedWall.name);  // Log the name of the selected wall
        }
    }

    window.addEventListener('click', onMouseClick);

    // Change the color of the selected wall
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
