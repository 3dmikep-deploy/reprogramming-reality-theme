/**
 * Main JavaScript for the Reprogramming Reality Theme v2.1
 *
 * This script handles the interactive elements of the theme, including:
 * 1. The interactive three.js hero canvas with a floating 3D glasses model.
 * 2. The reading progress bar on post pages.
 */

// We need to import the three.js library.
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

window.addEventListener('DOMContentLoaded', (event) => {
    // --- Initialize scripts based on which page we're on ---
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        initHeroAnimation();
    }

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        initReadingProgress();
    }

    // Initialize book pagination if we're on a chapter page
    const bookPagination = document.getElementById('book-pagination');
    if (bookPagination) {
        initBookPagination();
    }

    // Initialize chapter questions if we're on a chapter page
    // We'll let chapter-interactive.js handle this since it has all the question logic
    // This prevents initialization race conditions
});


/**
 * Creates a stylized 3D model of the glasses.
 * @returns {THREE.Group} A group containing all the parts of the glasses model.
 */
function createGlassesModel() {
    const glassesGroup = new THREE.Group();

    // Materials
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 });
    const redLensMaterial = new THREE.MeshStandardMaterial({ color: 0xff004b, transparent: true, opacity: 0.6, roughness: 0.2 });
    const cyanLensMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6, roughness: 0.2 });

    // Frame parts (using simple BoxGeometry)
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.05), frameMaterial);
    topBar.position.y = 0.2;
    
    const noseBridge = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), frameMaterial);
    noseBridge.position.y = 0.1;

    // Lenses
    const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.02), redLensMaterial);
    leftLens.position.x = -0.3;

    const rightLens = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.02), cyanLensMaterial);
    rightLens.position.x = 0.3;
    
    // --- NEW: Side Arms (Temples) ---
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.7), frameMaterial);
    leftArm.position.set(-0.575, 0.2, -0.3); // Positioned at the hinge of the left frame

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.7), frameMaterial);
    rightArm.position.set(0.575, 0.2, -0.3); // Positioned at the hinge of the right frame

    glassesGroup.add(topBar, noseBridge, leftLens, rightLens, leftArm, rightArm);
    
    // Scale the whole model down to a suitable size
    glassesGroup.scale.set(0.7, 0.7, 0.7);

    return glassesGroup;
}


/**
 * Initializes the three.js animation on the hero canvas.
 */
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    const container = document.getElementById('hero-canvas-container');

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 5);
    scene.add(directionalLight);

    // 3D Glasses Model
    const glasses = createGlassesModel();
    // --- NEW: Reposition the glasses to be below the title ---
    glasses.position.y = -0.6; 
    scene.add(glasses);

    // Particles
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00ff00,
        size: 0.015,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Animate particles
        particleSystem.rotation.y = elapsedTime * 0.03;

        // Animate Glasses
        glasses.rotation.y = elapsedTime * 0.2;
        glasses.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
        // --- NEW: Animate relative to its new base position ---
        glasses.position.y = -0.6 + Math.sin(elapsedTime * 0.7) * 0.1;

        // Make camera react to mouse
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}


/**
 * Initializes the reading progress bar functionality.
 */
function initReadingProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const updateProgressBar = () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
}

/**
 * Initializes the Split Reality scrolling effect on the homepage.
 */
function initSplitView() {
    const textItems = document.querySelectorAll('.split-text-item');
    const imageItems = document.querySelectorAll('.split-image-item');
    let activeImage = null;

    // Set the first image as active by default
    const firstImage = document.querySelector('.split-image-item');
    if (firstImage) {
        firstImage.classList.add('is-active');
        activeImage = firstImage;
    }

    // Create an observer to watch when text blocks enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const postId = entry.target.dataset.postId;
                const targetImage = document.querySelector(`.split-image-item[data-post-id="${postId}"]`);

                if (targetImage && targetImage !== activeImage) {
                    // Deactivate the currently active image
                    if (activeImage) {
                        activeImage.classList.remove('is-active');
                    }
                    // Activate the new target image
                    targetImage.classList.add('is-active');
                    activeImage = targetImage;
                }
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px', // Trigger when the item is in the vertical center of the screen
        threshold: 0
    });

    // Tell the observer to watch each of the text items
    textItems.forEach(item => {
        observer.observe(item);
    });
}

// Book Pagination Class
class BookPagination {
    constructor(container) {
        this.container = container;
        this.content = container.querySelector('.gh-content');
        this.pages = [];
        this.currentPage = 0;
        this.wordsPerPage = 350; // Adjust based on your needs
        this.init();
    }

    init() {
        // Get all paragraphs and headers
        const elements = Array.from(this.content.children);
        let currentPage = [];
        let wordCount = 0;

        elements.forEach(element => {
            const words = element.textContent.trim().split(/\s+/).length;
            
            if (wordCount + words > this.wordsPerPage && currentPage.length > 0) {
                this.pages.push(currentPage);
                currentPage = [];
                wordCount = 0;
            }
            
            currentPage.push(element.cloneNode(true));
            wordCount += words;
        });

        // Add remaining content as the last page
        if (currentPage.length > 0) {
            this.pages.push(currentPage);
        }

        this.createPaginationUI();
        this.showPage(0);
    }

    createPaginationUI() {
        // Clear existing content
        this.content.innerHTML = '';
        
        // Create page container
        const pageContainer = document.createElement('div');
        pageContainer.className = 'page-container';
        this.content.appendChild(pageContainer);

        // Create navigation
        const nav = document.createElement('div');
        nav.className = 'book-nav';
        nav.innerHTML = `
            <button class="prev-btn" ${this.currentPage === 0 ? 'disabled' : ''}>Previous</button>
            <span class="page-info">${this.currentPage + 1} / ${this.pages.length}</span>
            <button class="next-btn" ${this.currentPage === this.pages.length - 1 ? 'disabled' : ''}>Next</button>
        `;

        // Add event listeners
        nav.querySelector('.prev-btn').addEventListener('click', () => this.prevPage());
        nav.querySelector('.next-btn').addEventListener('click', () => this.nextPage());
        
        this.content.appendChild(nav);
    }

    showPage(pageNum) {
        if (pageNum < 0 || pageNum >= this.pages.length) return;
        
        const pageContainer = this.content.querySelector('.page-container');
        pageContainer.innerHTML = '';
        
        this.pages[pageNum].forEach(element => {
            pageContainer.appendChild(element);
        });

        this.currentPage = pageNum;
        
        // Update navigation
        const nav = this.content.querySelector('.book-nav');
        nav.querySelector('.prev-btn').disabled = pageNum === 0;
        nav.querySelector('.next-btn').disabled = pageNum === this.pages.length - 1;
        nav.querySelector('.page-info').textContent = `${pageNum + 1} / ${this.pages.length}`;

        // Scroll to top of content
        this.container.scrollIntoView({ behavior: 'smooth' });
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.showPage(this.currentPage + 1);
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.showPage(this.currentPage - 1);
        }
    }
}

function initBookPagination() {
    const container = document.getElementById('book-pagination');
    if (container) {
        new BookPagination(container);
    }
}

// Add this to your main DOMContentLoaded listener
window.addEventListener('DOMContentLoaded', (event) => {
    // ... (your existing hero and progress bar initializers)

    // Initialize the new split view if the container exists
    if (document.querySelector('.split-view-container')) {
        initSplitView();
    }
});
