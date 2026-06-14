document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            
            // Toggle icon menu / close
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile nav on click of link
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 2. Scroll Reveal Animations (Intersection Observer)
    // Automatically apply 'reveal' to section-headers, cards, and panels
    const elementsToReveal = [
        '.section-header', 
        '.about-text-card', 
        '.stat-card', 
        '.skill-card-neo', 
        '.project-card', 
        '.strengths-wrapper', 
        '.vision-card-wrap', 
        '.contact-info-panel', 
        '.contact-form-panel'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Contact Form Verification & Mailto Redirection
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;

            // Simple micro-interaction: loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Preparing mail... <i data-lucide="loader-2" class="spin"></i>';
            lucide.createIcons();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Simulate slight delay and construct mailto link
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                lucide.createIcons();

                // Construct and trigger mailto link
                const mailtoUrl = `mailto:rithish.codecraft@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry: ' + subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                window.location.href = mailtoUrl;

                // Show success feedback
                formFeedback.className = 'form-feedback-message success';
                formFeedback.style.display = 'block';
                formFeedback.innerHTML = `Mail client opened! Your message details have been prefilled for sending to rithish.codecraft@gmail.com.`;
                
                // Clear form inputs
                contactForm.reset();

                // Clear success message after 8 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 8000);
            }, 1000);
        });
    }

    // 4. Interactive Blueprint Grid Background Simulation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const gridSize = 40;

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(17, 17, 17, 0.04)';
        ctx.lineWidth = 1;
        
        // Draw grid lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw interactive circle around mouse
        if (mouse.x !== null && mouse.y !== null) {
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.12)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    function animate() {
        drawGrid();
        requestAnimationFrame(animate);
    }
    animate();
});
