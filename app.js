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
    
    setTimeout(type, 500);
}

// Create floating particles
function createParticles(containerId = 'particles') {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;
    
    const colors = [
        'rgba(255, 255, 255, 0.9)',
        'rgba(255, 215, 0, 0.9)',
        'rgba(255, 105, 180, 0.9)',
        'rgba(135, 206, 235, 0.9)',
        'rgba(152, 251, 152, 0.9)',
        'rgba(221, 160, 221, 0.9)',
        'rgba(255, 182, 193, 0.9)',
        'rgba(255, 255, 102, 0.9)'
    ];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        
        particle.style.left = `${Math.random() * 100}%`;
        
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', `${drift}px`);
        
        particle.style.animationDelay = `${Math.random() * -12}s`;
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Load configuration and populate page content
function loadConfig() {
    const receiverElement = document.getElementById('receiver-name');
    if (receiverElement) {
        typeWriterEffect(receiverElement, config.receiverName, 100);
    }
    
    const indexMessageElement = document.getElementById('index-message');
    if (indexMessageElement && config.indexMessage) {
        const typingDuration = config.receiverName.length * 100 + 500;
        setTimeout(() => {
            indexMessageElement.textContent = config.indexMessage;
            indexMessageElement.classList.add('fade-in-message');
        }, typingDuration);
    }
    
    const messageElement = document.getElementById('custom-message');
    if (messageElement) {
        messageElement.textContent = config.customMessage;
        loadPhotosFromFolder();
    }
    
    if (document.getElementById('particles-message')) {
        createParticles('particles-message');
    }
    
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
    
    document.addEventListener('mousemove', function(e) {
        if (buttonMoveCount >= maxMoves || isButtonMoving) return;
        
        const rect = button.getBoundingClientRect();
        const distance = 100;
        
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
    
    button.classList.add('droplet-morph');
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    const cardRect = button.parentElement.getBoundingClientRect();
    
    const moveToLeft = buttonMoveCount % 2 === 1;
    
    const safeMargin = 20;
    const maxLeftMove = -(buttonRect.left - cardRect.left - safeMargin);
    const maxRightMove = (cardRect.right - buttonRect.right - safeMargin);
    
    const randomX = moveToLeft ? maxLeftMove : maxRightMove;
    
    const maxVerticalMove = 80;
    const randomY = (Math.random() - 0.5) * maxVerticalMove;
    
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    setTimeout(() => {
        button.classList.remove('droplet-morph');
        isButtonMoving = false;
        
        if (buttonMoveCount >= maxMoves) {
            button.classList.add('catchable');
            button.style.cursor = 'pointer';
        }
    }, 400);
}

function goToNextPage() {
    if (buttonMoveCount < maxMoves) {
        return;
    }
    window.location.href = 'message.html';
}

function goBack() {
    window.location.href = 'index.html';
}

// Image Carousel Functionality
let currentImageIndex = 0;

function loadPhotosFromFolder() {
    const carouselContainer = document.getElementById('carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    const photos = config.photos || [];
    
    if (photos.length === 0) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    carouselContainer.style.display = 'block';
    
    carouselTrack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
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
            this.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'image-error';
            errorMsg.textContent = `⚠️ Could not load: ${photoFilename}`;
            item.appendChild(errorMsg);
        };
        
        item.appendChild(img);
        carouselTrack.appendChild(item);
        
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

document.addEventListener('DOMContentLoaded', loadConfig);
