 // Global variables
        let particleCount = 0;
        const maxParticles = 30;

        // Initialize on DOM load
        document.addEventListener('DOMContentLoaded', function() {
            initializeAll();
        });

        function initializeAll() {
            initializeAnimations();
            initializeScrollEffects();
            initializeParticleEffect();
            initializeTypingEffect();
            initializeNavigation();
            initializeSkillTags();
            initializeProgressBar();
            initializeCursorTrail();
            initializeSmoothScrolling();
        }

        // Smooth scrolling for navigation links
        function initializeSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu if open
                        document.getElementById('navLinks').classList.remove('active');
                        document.getElementById('hamburger').classList.remove('active');
                    }
                });
            });
        }

        // Navigation functionality
        function initializeNavigation() {
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }

        // Intersection Observer for animations
        function initializeAnimations() {
            const sections = document.querySelectorAll('.section, .profile-section');
            const observerOptions = { 
                threshold: 0.1, 
                rootMargin: '0px 0px -50px 0px' 
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => observer.observe(section));
        }

        // Scroll effects
        function initializeScrollEffects() {
            const backToTop = document.getElementById('backToTop');
            const progressBar = document.getElementById('progressBar');
            
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (scrollTop / scrollHeight) * 100;
                
                // Progress bar
                progressBar.style.width = scrolled + '%';
                
                // Back to top button
                if (scrollTop > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
                
                // Add navbar background on scroll
                const nav = document.getElementById('mainNav');
                if (scrollTop > 100) {
                    nav.style.background = 'rgba(12,20,69,0.98)';
                    nav.style.backdropFilter = 'blur(20px)';
                } else {
                    nav.style.background = 'rgba(12,20,69,0.95)';
                    nav.style.backdropFilter = 'blur(10px)';
                }
            });
        }

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Particle effect on mouse move
        function initializeParticleEffect() {
            document.addEventListener('mousemove', function(e) {
                if (particleCount < maxParticles && Math.random() > 0.8) {
                    createParticle(e.clientX, e.clientY);
                }
            });
        }

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(79, 172, 254, 0.8);
                border-radius: 50%;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                animation: particleFade 2s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            particleCount++;
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
                particleCount--;
            }, 2000);
        }

        // Typing effect
        function initializeTypingEffect() {
            const typing = document.getElementById('animatedTyping');
            const texts = [
                "Aspiring Software Engineer 💻",
                "Web Developer 🌐", 
                "Tech Enthusiast 🚀",
                "Problem Solver 🧩",
                "Lifelong Learner 📚"
            ];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeText() {
                const currentText = texts[textIndex];
                
                if (!isDeleting && charIndex < currentText.length) {
                    typing.textContent = currentText.substring(0, charIndex + 1) + '|';
                    charIndex++;
                    setTimeout(typeText, 100);
                } else if (isDeleting && charIndex > 0) {
                    typing.textContent = currentText.substring(0, charIndex - 1) + '|';
                    charIndex--;
                    setTimeout(typeText, 50);
                } else {
                    isDeleting = !isDeleting;
                    if (!isDeleting) {
                        textIndex = (textIndex + 1) % texts.length;
                    }
                    setTimeout(typeText, 1000);
                }
            }

            if (typing) typeText();
        }

        // Progress bar
        function initializeProgressBar() {
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = '0%';
        }

        // Cursor trail effect
        function initializeCursorTrail() {
            let trails = [];
            const maxTrails = 8;
            
            document.addEventListener('mousemove', function(e) {
                if (Math.random() > 0.7) {
                    const trail = document.createElement('div');
                    trail.style.cssText = `
                        position: fixed;
                        width: 6px;
                        height: 6px;
                        background: radial-gradient(circle, rgba(79, 172, 254, 0.6) 0%, transparent 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        left: ${e.clientX - 3}px;
                        top: ${e.clientY - 3}px;
                        z-index: 9998;
                        animation: trailFade 1s ease-out forwards;
                    `;
                    
                    document.body.appendChild(trail);
                    trails.push(trail);
                    
                    if (trails.length > maxTrails) {
                        const oldTrail = trails.shift();
                        if (oldTrail.parentNode) {
                            oldTrail.remove();
                        }
                    }
                    
                    setTimeout(() => {
                        if (trail.parentNode) {
                            trail.remove();
                        }
                    }, 1000);
                }
            });
            
            // Add trail fade animation
            const trailStyle = document.createElement('style');
            trailStyle.textContent = `
                @keyframes trailFade {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.2); }
                }
            `;
            document.head.appendChild(trailStyle);
        }

        // Skill tags interaction
        function initializeSkillTags() {
            document.querySelectorAll('.skill-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Add ripple effect
                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        background: rgba(255,255,255,0.5);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                });
            });
            
            // Add ripple animation
            const rippleStyle = document.createElement('style');
            rippleStyle.textContent = `
                @keyframes ripple {
                    to { transform: scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(rippleStyle);
        }

        // Copy to clipboard function
        function copyToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('📋 Copied to clipboard!', 'success');
                }).catch(() => {
                    fallbackCopyTextToClipboard(text);
                });
            } else {
                fallbackCopyTextToClipboard(text);
            }
        }

        function fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showNotification('📋 Copied to clipboard!', 'success');
            } catch (err) {
                showNotification('❌ Copy failed. Please try again.', 'error');
            }
            
            document.body.removeChild(textArea);
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'linear-gradient(45deg, #4caf50, #45a049)' : 'linear-gradient(45deg, #f44336, #d32f2f)'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10001;
                animation: slideIn 0.3s ease;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            `;
            
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }

        // Add slide out animation
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(slideOutStyle);

        // Download resume function
        function downloadResume() {
            const resumeContent = `SNEHASISH DEY
Aspiring IT Professional | Tech Learner | Web Developer

📞 CONTACT INFORMATION:
Phone: +91 7908242467
Email: snehasishdey02@gmail.com
Location: Kolkata, West Bengal, India

🎓 EDUCATION:
Bachelor of Technology - Information Technology
Narula Institute of Technology (2024-2028)
Current CGPA: 8.41 (1st Year) | Currently in 2nd Year

Higher Secondary Education (Class 12)
Digha Vidyabhawan | Percentage: 80.2% | Year: 2024

Secondary Education (Class 10)  
Digha Vidyabhawan | Percentage: 90.85% | Year: 2022

💻 TECHNICAL SKILLS:
Programming Languages: Java, C, JavaScript
Web Technologies: HTML5, CSS3, JavaScript
Tools & Technologies: Git, GitHub, VS Code
Concepts: Data Structures, Algorithms, OOPs , Responsive Design

🏅 CERTIFICATIONS:
• Java Programming Fundamentals - Crio.Do (June 2025)
• GitHub Basics & Version Control - SimpliLearn (June 2025)  
• AI Tools Workshop - Be10X (July 2025)
* Deloitte Australia - Data Analytics Job Simulation - Forage ( July 2025)


📝 PROJECTS:
• Personal Portfolio Website (HTML, CSS, JavaScript)
• Java Programming Practice Projects (Data Structures & Algorithms)
• Web Development Learning Projects (Responsive Design)

🎯 CAREER OBJECTIVE:
I'm currently pursuing B.Tech in Information Technology with a strong passion for web development and programming. I aim to become a skilled software engineer who can contribute meaningfully to innovative technology solutions while continuously learning and adapting to new technologies.

📊 ACHIEVEMENTS:
• Maintaining 8.41 CGPA in B.Tech IT program
• Completed multiple industry-relevant certifications
• Active learner with hands-on project experience
• Strong foundation in programming and web development

Generated on: ${new Date().toLocaleDateString()}`;

            try {
                const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Snehasish_Dey_Resume.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                showDownloadFeedback();
            } catch (error) {
                console.error('Download failed:', error);
                showNotification('❌ Download failed. Please try again.', 'error');
            }
        }

        function showDownloadFeedback() {
            const btn = document.querySelector('.download-btn');
            const originalText = btn.textContent;
            const originalBackground = btn.style.background;
            
            btn.textContent = '✅ Downloaded!';
            btn.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
            btn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = originalBackground || 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)';
                btn.style.transform = '';
            }, 2500);
            
            showNotification('📄 Resume downloaded successfully!', 'success');
        }

        // Add some interactive elements
        function addInteractiveElements() {
            // Add hover effects to project cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click effects to contact items
            document.querySelectorAll('.contact-item').forEach(item => {
                item.addEventListener('click', function() {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });

            // Add floating animation to profile image
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                setInterval(() => {
                    profileImage.style.transform = 'translateY(-10px) rotate(2deg)';
                    setTimeout(() => {
                        profileImage.style.transform = 'translateY(0) rotate(0deg)';
                    }, 2000);
                }, 4000);
            }
        }

        // Initialize interactive elements after DOM load
        setTimeout(addInteractiveElements, 1000);

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        });

        // Performance optimization: Lazy load animations
        function lazyLoadAnimations() {
            const elements = document.querySelectorAll('.section, .goal-item, .certificate-card, .project-card');
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '50px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            elements.forEach(el => observer.observe(el));
        }

        // Add CSS for lazy loading
        const lazyStyle = document.createElement('style');
        lazyStyle.textContent = `
            .animate-in {
                animation: slideInFromBottom 0.6s ease forwards;
            }
            
            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(lazyStyle);

        // Initialize lazy loading
        setTimeout(lazyLoadAnimations, 500);

        // Add easter egg - Konami code
        let konamiCode = [];
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.code);
            if (konamiCode.length > konami.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konami.join(',')) {
                showEasterEgg();
                konamiCode = [];
            }
        });

        function showEasterEgg() {
            const easter = document.createElement('div');
            easter.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                z-index: 10002;
                text-align: center;
                font-size: 1.2rem;
                font-weight: bold;
                animation: bounceIn 0.5s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            `;
            easter.innerHTML = `
                <div>🎉 Congratulations! 🎉</div>
                <div style="margin: 1rem 0;">You found the secret!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">Thanks for exploring my portfolio!</div>
            `;
            
            document.body.appendChild(easter);
            
            setTimeout(() => {
                easter.style.animation = 'bounceOut 0.5s ease forwards';
                setTimeout(() => easter.remove(), 500);
            }, 3000);
        }

        // Add bounce animations
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
            
            @keyframes bounceOut {
                0% { transform: translate(-50%, -50%) scale(1); }
                100% { transform: translate(-50%, -50%) scale(0); }
            }
        `;
        document.head.appendChild(bounceStyle);

        // Add theme persistence (optional)
        function saveThemePreference(theme) {
            try {
                // Since we can't use localStorage, we'll just keep it in memory for the session
                window.currentTheme = theme;
            } catch (e) {
                console.log('Theme preference not saved');
            }
        }

        // Add print styles
        const printStyle = document.createElement('style');
        printStyle.textContent = `
            @media print {
                .top-banner, .main-nav, .back-to-top, .floating-shapes, .progress-bar {
                    display: none !important;
                }
                
                body {
                    background: white !important;
                    color: black !important;
                }
                
                .section {
                    background: white !important;
                    border: 1px solid #ddd !important;
                    page-break-inside: avoid;
                    margin-bottom: 20px;
                }
                
                .profile-image {
                    width: 150px !important;
                    height: 150px !important;
                }
                
                .animated-typing {
                    display: none;
                }
                
                a {
                    color: #0066cc !important;
                }
            }
        `;
        document.head.appendChild(printStyle);

        // Add accessibility features
        function initializeAccessibility() {
            // Add skip to content link
            const skipLink = document.createElement('a');
            skipLink.href = '#about';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
                position: fixed;
                top: -100px;
                left: 10px;
                z-index: 10003;
                background: #4facfe;
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                text-decoration: none;
                font-weight: bold;
                transition: top 0.3s;
            `;
            
            skipLink.addEventListener('focus', function() {
                this.style.top = '10px';
            });
            
            skipLink.addEventListener('blur', function() {
                this.style.top = '-100px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            // Add ARIA labels to interactive elements
            document.querySelectorAll('.skill-tag').forEach((tag, index) => {
                tag.setAttribute('role', 'button');
                tag.setAttribute('tabindex', '0');
                tag.setAttribute('aria-label', `Skill: ${tag.textContent}`);
            });
            
            document.querySelectorAll('.contact-item').forEach(item => {
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
            });
        }

        // Initialize accessibility features
        setTimeout(initializeAccessibility, 100);

        // Add focus management for modal-like elements
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = document.querySelectorAll(
                    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                );
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Final initialization message
        console.log('🚀 Portfolio initialized successfully!');
        console.log('💡 Try the Konami code for a surprise!');
        console.log('📱 Portfolio is fully responsive and accessible');
        
