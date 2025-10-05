// Initialize Three.js scene
let scene, camera, renderer, cubes = [], particles = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 30);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff8a00, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xe52e71, 1, 100);
    pointLight1.position.set(-10, -10, -10);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x302b63, 1, 100);
    pointLight2.position.set(10, 10, 10);
    scene.add(pointLight2);

    // Create floating cubes
    createCubes();
    
    // Create particle system
    createParticles();
    
    // Create torus knot
    createTorusKnot();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Handle mouse move for parallax effect
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Start animation
    animate();
}

function createCubes() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Create multiple cubes with different colors and positions
    for (let i = 0; i < 30; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: i % 3 === 0 ? 0xff8a00 : (i % 3 === 1 ? 0xe52e71 : 0x302b63),
            transparent: true,
            opacity: 0.8,
            wireframe: Math.random() > 0.7,
            shininess: 100,
            emissive: i % 3 === 0 ? 0x331100 : (i % 3 === 1 ? 0x330011 : 0x110033),
            emissiveIntensity: 0.5
        });

        const cube = new THREE.Mesh(geometry, material);
        
        // Position cubes randomly in 3D space
        cube.position.x = (Math.random() - 0.5) * 40;
        cube.position.y = (Math.random() - 0.5) * 40;
        cube.position.z = (Math.random() - 0.5) * 40;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        // Add shadows
        cube.castShadow = true;
        cube.receiveShadow = true;
        
        // Store cube for animation
        cubes.push({
            mesh: cube,
            speed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            }
        });
        
        scene.add(cube);
    }
}

function createParticles() {
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function createTorusKnot() {
    const geometry = new THREE.TorusKnotGeometry(3, 1, 128, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff8a00,
        emissive: 0x331100,
        shininess: 100,
        wireframe: false,
        transparent: true,
        opacity: 0.7
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.position.set(0, 0, -20);
    torusKnot.castShadow = true;
    scene.add(torusKnot);
    
    // Store for animation
    cubes.push({
        mesh: torusKnot,
        speed: {
            x: 0.005,
            y: 0.007,
            z: 0
        },
        rotationSpeed: {
            x: 0.01,
            y: 0.01
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Animate cubes
    cubes.forEach(cubeObj => {
        cubeObj.mesh.rotation.x += cubeObj.rotationSpeed.x;
        cubeObj.mesh.rotation.y += cubeObj.rotationSpeed.y;
        
        cubeObj.mesh.position.x += cubeObj.speed.x;
        cubeObj.mesh.position.y += cubeObj.speed.y;
        cubeObj.mesh.position.z += cubeObj.speed.z;
        
        // Boundary check - bounce when hitting edges
        if (cubeObj.mesh.position.x > 20 || cubeObj.mesh.position.x < -20) cubeObj.speed.x *= -1;
        if (cubeObj.mesh.position.y > 20 || cubeObj.mesh.position.y < -20) cubeObj.speed.y *= -1;
        if (cubeObj.mesh.position.z > 10 || cubeObj.mesh.position.z < -30) cubeObj.speed.z *= -1;
    });
    
    // Rotate camera with mouse parallax
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Rotate particles
    particles.forEach(particleSystem => {
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.001;
    });
    
    renderer.render(scene, camera);
}

// Form validation and submission
function initForm() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (username.trim() === '' || password.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        
        // Simulate login process
        const loginBtn = document.querySelector('.access-btn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Đang đăng nhập...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Đăng nhập thành công! Chuyển hướng đến hệ thống...');
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
            // In a real application, you would redirect to the main system page
            // window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    init();
    initForm();
    
    // Add scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.padding = '10px 50px';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.3)';
            header.style.padding = '20px 50px';
        }
    });
});