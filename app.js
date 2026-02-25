<<<<<<< HEAD
// Typing animation for the receiver name
function typeWriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500); // Small delay before starting
}

// Create floating particles
function createParticles(containerId = 'particles') {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;
    
    const colors = [
        'rgba(255, 255, 255, 0.9)',   // White
        'rgba(255, 215, 0, 0.9)',     // Gold
        'rgba(255, 105, 180, 0.9)',   // Hot Pink
        'rgba(135, 206, 235, 0.9)',   // Sky Blue
        'rgba(152, 251, 152, 0.9)',   // Pale Green
        'rgba(221, 160, 221, 0.9)',   // Plum
        'rgba(255, 182, 193, 0.9)',   // Light Pink
        'rgba(255, 255, 102, 0.9)'    // Light Yellow
    ];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 6px and 16px
        const size = Math.random() * 10 + 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Random animation delay to stagger particles
        particle.style.animationDelay = `${Math.random() * -12}s`;
        
        // Random animation duration (between 8 and 16 seconds)
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Load configuration and populate page content
function loadConfig() {
    // Update receiver name on index page with typing effect
    const receiverElement = document.getElementById('receiver-name');
    if (receiverElement) {
        typeWriterEffect(receiverElement, config.receiverName, 100);
    }
    
    // Update index page message with fade-in after typing completes
    const indexMessageElement = document.getElementById('index-message');
    if (indexMessageElement && config.indexMessage) {
        // Calculate typing duration and add a small delay
        const typingDuration = config.receiverName.length * 100 + 500;
        setTimeout(() => {
            indexMessageElement.textContent = config.indexMessage;
            indexMessageElement.classList.add('fade-in-message');
        }, typingDuration);
    }
    
    // Update custom message on message page
    const messageElement = document.getElementById('custom-message');
    if (messageElement) {
        messageElement.textContent = config.customMessage;
        loadPhotosFromFolder();
    }
    
    // Create particles on message page too
    if (document.getElementById('particles-message')) {
        createParticles('particles-message');
    }
    
    // Create particles on index page
    if (document.getElementById('particles')) {
        createParticles('particles');
        setupPlayfulButton();
    }
}

// Playful button interaction
let buttonMoveCount = 0;
const maxMoves = 2;
let isButtonMoving = false;

function setupPlayfulButton() {
    const button = document.querySelector('.next-button');
    if (!button) return;
    
    button.addEventListener('mouseenter', function(e) {
        if (buttonMoveCount < maxMoves && !isButtonMoving) {
            moveButton(button);
        }
    });
    
    // Also check proximity on mouse move
    document.addEventListener('mousemove', function(e) {
        if (buttonMoveCount >= maxMoves || isButtonMoving) return;
        
        const rect = button.getBoundingClientRect();
        const distance = 100; // Pixels to trigger escape (larger detection zone)
        
        // Check if mouse is close to button
        const isClose = (
            e.clientX >= rect.left - distance &&
            e.clientX <= rect.right + distance &&
            e.clientY >= rect.top - distance &&
            e.clientY <= rect.bottom + distance
        );
        
        if (isClose && buttonMoveCount < maxMoves) {
            moveButton(button);
        }
    });
}

function moveButton(button) {
    isButtonMoving = true;
    buttonMoveCount++;
    
    // Add morphing animation
    button.classList.add('droplet-morph');
    
    // Get viewport and button dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    const cardRect = button.parentElement.getBoundingClientRect();
    
    // Calculate extreme positions (end to end movement)
    // Alternate between far left and far right
    const moveToLeft = buttonMoveCount % 2 === 1;
    
    // Calculate maximum safe translation
    const safeMargin = 20; // Pixels from edge
    const maxLeftMove = -(buttonRect.left - cardRect.left - safeMargin);
    const maxRightMove = (cardRect.right - buttonRect.right - safeMargin);
    
    // Choose dramatic horizontal position
    const randomX = moveToLeft ? maxLeftMove : maxRightMove;
    
    // Add some vertical variation
    const maxVerticalMove = 80;
    const randomY = (Math.random() - 0.5) * maxVerticalMove;
    
    // Apply transform with fast animation
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Remove morphing class after animation
    setTimeout(() => {
        button.classList.remove('droplet-morph');
        isButtonMoving = false;
        
        // If max moves reached, add a "catchable" class
        if (buttonMoveCount >= maxMoves) {
            button.classList.add('catchable');
            button.style.cursor = 'pointer';
        }
    }, 400);
}

// Navigate to the message page
function goToNextPage() {
    if (buttonMoveCount < maxMoves) {
        return; // Don't navigate if button hasn't been "caught"
    }
    window.location.href = 'message.html';
}

// Navigate back to the index page
function goBack() {
    window.location.href = 'index.html';
}

// Image Carousel Functionality
let currentImageIndex = 0;

function loadPhotosFromFolder() {
    const carouselContainer = document.getElementById('carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    // Get photos from config
    const photos = config.photos || [];
    
    if (photos.length === 0) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    // Show carousel
    carouselContainer.style.display = 'block';
    
    // Clear existing content
    carouselTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Add images to carousel
    photos.forEach((photoFilename, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === currentImageIndex) {
            item.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = `photos/${photoFilename}`;
        img.alt = `Photo ${index + 1}`;
        img.onerror = function() {
            // If image fails to load, show a placeholder
            this.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'image-error';
            errorMsg.textContent = `⚠️ Could not load: ${photoFilename}`;
            item.appendChild(errorMsg);
        };
        
        item.appendChild(img);
        carouselTrack.appendChild(item);
        
        // Add indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        }
        indicator.onclick = () => goToImage(index);
        indicatorsContainer.appendChild(indicator);
    });
}

function navigateCarousel(direction) {
    const photos = config.photos || [];
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = photos.length - 1;
    } else if (currentImageIndex >= photos.length) {
        currentImageIndex = 0;
    }
    
    loadPhotosFromFolder();
}

function goToImage(index) {
    currentImageIndex = index;
    loadPhotosFromFolder();
}

// Load config when page loads
document.addEventListener('DOMContentLoaded', loadConfig);
=======
// Typing animation for the receiver name
function typeWriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500); // Small delay before starting
}

// Create floating particles
function createParticles(containerId = 'particles') {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;
    
    const colors = [
        'rgba(255, 255, 255, 0.9)',   // White
        'rgba(255, 215, 0, 0.9)',     // Gold
        'rgba(255, 105, 180, 0.9)',   // Hot Pink
        'rgba(135, 206, 235, 0.9)',   // Sky Blue
        'rgba(152, 251, 152, 0.9)',   // Pale Green
        'rgba(221, 160, 221, 0.9)',   // Plum
        'rgba(255, 182, 193, 0.9)',   // Light Pink
        'rgba(255, 255, 102, 0.9)'    // Light Yellow
    ];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 6px and 16px
        const size = Math.random() * 10 + 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Random animation delay to stagger particles
        particle.style.animationDelay = `${Math.random() * -12}s`;
        
        // Random animation duration (between 8 and 16 seconds)
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Load configuration and populate page content
function loadConfig() {
    // Update receiver name on index page with typing effect
    const receiverElement = document.getElementById('receiver-name');
    if (receiverElement) {
        typeWriterEffect(receiverElement, config.receiverName, 100);
    }
    
    // Update index page message with fade-in after typing completes
    const indexMessageElement = document.getElementById('index-message');
    if (indexMessageElement && config.indexMessage) {
        // Calculate typing duration and add a small delay
        const typingDuration = config.receiverName.length * 100 + 500;
        setTimeout(() => {
            indexMessageElement.textContent = config.indexMessage;
            indexMessageElement.classList.add('fade-in-message');
        }, typingDuration);
    }
    
    // Update custom message on message page
    const messageElement = document.getElementById('custom-message');
    if (messageElement) {
        messageElement.textContent = config.customMessage;
        loadPhotosFromFolder();
    }
    
    // Create particles on message page too
    if (document.getElementById('particles-message')) {
        createParticles('particles-message');
    }
    
    // Create particles on index page
    if (document.getElementById('particles')) {
        createParticles('particles');
        setupPlayfulButton();
    }
}

// Playful button interaction
let buttonMoveCount = 0;
const maxMoves = 2;
let isButtonMoving = false;

function setupPlayfulButton() {
    const button = document.querySelector('.next-button');
    if (!button) return;
    
    button.addEventListener('mouseenter', function(e) {
        if (buttonMoveCount < maxMoves && !isButtonMoving) {
            moveButton(button);
        }
    });
    
    // Also check proximity on mouse move
    document.addEventListener('mousemove', function(e) {
        if (buttonMoveCount >= maxMoves || isButtonMoving) return;
        
        const rect = button.getBoundingClientRect();
        const distance = 100; // Pixels to trigger escape (larger detection zone)
        
        // Check if mouse is close to button
        const isClose = (
            e.clientX >= rect.left - distance &&
            e.clientX <= rect.right + distance &&
            e.clientY >= rect.top - distance &&
            e.clientY <= rect.bottom + distance
        );
        
        if (isClose && buttonMoveCount < maxMoves) {
            moveButton(button);
        }
    });
}

function moveButton(button) {
    isButtonMoving = true;
    buttonMoveCount++;
    
    // Add morphing animation
    button.classList.add('droplet-morph');
    
    // Get viewport and button dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    const cardRect = button.parentElement.getBoundingClientRect();
    
    // Calculate extreme positions (end to end movement)
    // Alternate between far left and far right
    const moveToLeft = buttonMoveCount % 2 === 1;
    
    // Calculate maximum safe translation
    const safeMargin = 20; // Pixels from edge
    const maxLeftMove = -(buttonRect.left - cardRect.left - safeMargin);
    const maxRightMove = (cardRect.right - buttonRect.right - safeMargin);
    
    // Choose dramatic horizontal position
    const randomX = moveToLeft ? maxLeftMove : maxRightMove;
    
    // Add some vertical variation
    const maxVerticalMove = 80;
    const randomY = (Math.random() - 0.5) * maxVerticalMove;
    
    // Apply transform with fast animation
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Remove morphing class after animation
    setTimeout(() => {
        button.classList.remove('droplet-morph');
        isButtonMoving = false;
        
        // If max moves reached, add a "catchable" class
        if (buttonMoveCount >= maxMoves) {
            button.classList.add('catchable');
            button.style.cursor = 'pointer';
        }
    }, 400);
}

// Navigate to the message page
function goToNextPage() {
    if (buttonMoveCount < maxMoves) {
        return; // Don't navigate if button hasn't been "caught"
    }
    window.location.href = 'message.html';
}

// Navigate back to the index page
function goBack() {
    window.location.href = 'index.html';
}

// Image Carousel Functionality
let currentImageIndex = 0;

function loadPhotosFromFolder() {
    const carouselContainer = document.getElementById('carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    // Get photos from config
    const photos = config.photos || [];
    
    if (photos.length === 0) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    // Show carousel
    carouselContainer.style.display = 'block';
    
    // Clear existing content
    carouselTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // Add images to carousel
    photos.forEach((photoFilename, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === currentImageIndex) {
            item.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = `photos/${photoFilename}`;
        img.alt = `Photo ${index + 1}`;
        img.onerror = function() {
            // If image fails to load, show a placeholder
            this.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'image-error';
            errorMsg.textContent = `⚠️ Could not load: ${photoFilename}`;
            item.appendChild(errorMsg);
        };
        
        item.appendChild(img);
        carouselTrack.appendChild(item);
        
        // Add indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        }
        indicator.onclick = () => goToImage(index);
        indicatorsContainer.appendChild(indicator);
    });
}

function navigateCarousel(direction) {
    const photos = config.photos || [];
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = photos.length - 1;
    } else if (currentImageIndex >= photos.length) {
        currentImageIndex = 0;
    }
    
    loadPhotosFromFolder();
}

function goToImage(index) {
    currentImageIndex = index;
    loadPhotosFromFolder();
}

// Load config when page loads
document.addEventListener('DOMContentLoaded', loadConfig);
>>>>>>> 34c8742e21ad551363430e5af2042ee2d461d2f9
