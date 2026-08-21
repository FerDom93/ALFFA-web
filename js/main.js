// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animating if we only want it once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Simple form submission handler (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
});

// Lightbox Gallery Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentImages = [];
let currentIndex = 0;

function openLightbox(images) {
    if (!images || images.length === 0) return;
    currentImages = images;
    currentIndex = 0;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    // Use timeout to allow display flex to apply before setting opacity for transition
    setTimeout(() => lightbox.classList.add('active'), 10);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

function updateLightboxImage() {
    lightboxImg.src = currentImages[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

// Attach click events to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const imagesData = item.getAttribute('data-images');
        if (imagesData) {
            try {
                const images = JSON.parse(imagesData);
                openLightbox(images);
            } catch (e) {
                console.error("Error parsing images data:", e);
                // Fallback to single image if data-images is not valid JSON
                openLightbox([item.querySelector('img').src]);
            }
        } else {
            // Fallback to single image if no data-images attribute
            openLightbox([item.querySelector('img').src]);
        }
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});
