/* ===================================
   SMOOTH SCROLL NAVIGATION
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   STICKY HEADER
   =================================== */
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

/* ===================================
   MOBILE MENU TOGGLE
   =================================== */
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Toggle animation
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = mobileMenuToggle.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = mobileMenuToggle.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = mobileMenuToggle.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });
}

/* ===================================
   FAQ ACCORDION
   =================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

/* ===================================
   SCROLL REVEAL ANIMATIONS
   =================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateOnScroll = document.querySelectorAll(
    '.feature-card, .pricing-card, .deliverable-card, .differential-item, .testimonial-card'
);

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ===================================
   FORM HANDLING - WEBHOOK INTEGRATION
   =================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Get the submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="32" stroke-dashoffset="0" opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4"/>
            </svg>
            Enviando...
        `;

        // Add spin animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        try {
            // Preparar dados para o webhook conforme documentação
            const webhookData = {
                Nome: data.name || '',
                Email: data.email || '',
                Fonezap: data.phone || '',
                Empresa: `Lead - ${data.city || 'Cidade não informada'}`,
                Prodserv: 'Licenciamento Escola VOE',
                Valor: 0,
                Infos: `Cidade: ${data.city || 'Não informado'}\nInteresse: ${data.option || 'Não informado'}`,
                Origem: 'Landing Page Licenciamento',
                Site: window.location.hostname,
                Tag: data.option || 'licenciamento',
                Token: 'GL1XIOMOH5FESY3K17ZZ'
            };

            // Enviar para o webhook
            const response = await fetch('https://funilonline.app/api/1.1/wf/novolead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(webhookData)
            });

            if (response.ok) {
                // Show success message
                submitButton.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Enviado com Sucesso!
                `;
                submitButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';

                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                }, 3000);

                console.log('Lead enviado com sucesso!', webhookData);
            } else {
                throw new Error('Erro ao enviar formulário');
            }

        } catch (error) {
            console.error('Erro:', error);

            // Show error message
            submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L2 18H18L10 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Erro ao enviar. Tente novamente.
            `;
            submitButton.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
            }, 3000);
        }
    });
}

/* ===================================
   PHONE MASK
   =================================== */
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }

        e.target.value = value;
    });
}

/* ===================================
   STATS COUNTER ANIMATION
   =================================== */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.innerText;

            // Only animate numbers
            if (finalValue.includes('+') || finalValue.includes('%')) {
                const number = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');
                const duration = 2000;
                const steps = 60;
                const stepValue = number / steps;
                let currentValue = 0;

                const counter = setInterval(() => {
                    currentValue += stepValue;
                    if (currentValue >= number) {
                        target.innerText = number + suffix;
                        clearInterval(counter);
                    } else {
                        target.innerText = Math.floor(currentValue) + suffix;
                    }
                }, duration / steps);

                statsObserver.unobserve(target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

/* ===================================
   PRICING CARDS HIGHLIGHT
   =================================== */
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        pricingCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

/* ===================================
   LAZY LOADING IMAGES (if any are added)
   =================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===================================
   SCROLL TO TOP BUTTON
   =================================== */
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-4px)';
    scrollToTopBtn.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
});

/* ===================================
   HERO BACKGROUND CAROUSEL
   =================================== */
const heroBgImages = document.querySelectorAll('.hero-bg-image');
let currentBgIndex = 0;

function showNextBgImage() {
    // Remove active class from current image
    heroBgImages[currentBgIndex].classList.remove('active');

    // Move to next image
    currentBgIndex = (currentBgIndex + 1) % heroBgImages.length;

    // Add active class to new image
    heroBgImages[currentBgIndex].classList.add('active');
}

// Change background image every 20 seconds
if (heroBgImages.length > 0) {
    setInterval(showNextBgImage, 20000);
}

/* ===================================
   CONSOLE MESSAGE
   =================================== */
console.log('%c🌱 Voe Educacional', 'color: #10B981; font-size: 24px; font-weight: bold;');
console.log('%cTransformando a educação com sustentabilidade e inovação', 'color: #6B7280; font-size: 14px;');
