document.addEventListener('DOMContentLoaded', function() {
    // Binary rain effect for chapter cards
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach((card, index) => {
        // Add staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
        
        // Binary overlay effect on hover
        card.addEventListener('mouseenter', function() {
            createBinaryRain(this);
        });
    });
    
    // Create binary rain effect
    function createBinaryRain(element) {
        const overlay = document.createElement('div');
        overlay.className = 'binary-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        overlay.style.overflow = 'hidden';
        overlay.style.zIndex = '10';
        
        // Generate binary characters
        for (let i = 0; i < 50; i++) {
            const span = document.createElement('span');
            span.textContent = Math.random() > 0.5 ? '1' : '0';
            span.style.position = 'absolute';
            span.style.color = '#00ff00';
            span.style.fontSize = '14px';
            span.style.fontFamily = 'monospace';
            span.style.left = Math.random() * 100 + '%';
            span.style.top = -20 + 'px';
            span.style.opacity = Math.random();
            span.style.animation = `fall ${2 + Math.random() * 3}s linear infinite`;
            span.style.animationDelay = Math.random() * 2 + 's';
            overlay.appendChild(span);
        }
        
        element.appendChild(overlay);
        
        // Remove overlay on mouse leave
        element.addEventListener('mouseleave', function() {
            setTimeout(() => overlay.remove(), 500);
        }, { once: true });
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Type writer effect for tagline
    const tagline = document.querySelector('.book-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Add CSS for falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);
