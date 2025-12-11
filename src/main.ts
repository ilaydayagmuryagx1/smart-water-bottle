
import { createButton, ButtonOptions } from './components/Button';
import { createCard, CardOptions } from './components/Card';
import { Modal } from './components/Modal';
import { Accordion, AccordionItem } from './components/Accordion';


declare global {
    interface Window {
        showModal: (title: string, message: string) => void;
        closeModal: () => void;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Water Bottle - Initializing...');
    
    // ===== 1. THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    if (themeToggle && themeIcon) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme: string): void {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
    }
    
    // ===== 2. MODAL COMPONENT =====
    const modalElement = document.getElementById('success-modal');
    if (modalElement) {
        const modal = new Modal(modalElement as HTMLElement);
        
        // Global functions
        window.showModal = (title: string, message: string) => {
            const modalTitle = modalElement.querySelector('.modal__title') as HTMLElement;
            const modalMessage = modalElement.querySelector('.modal__message') as HTMLElement;
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalMessage) modalMessage.textContent = message;
            
            modal.show();
        };
        
        window.closeModal = () => modal.hide();
        
        // Modal içindeki close butonları
        const modalCloseBtn = modalElement.querySelector('.modal__close');
        const modalOkBtn = modalElement.querySelector('.btn--modal');
        
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => modal.hide());
        }
        
        if (modalOkBtn) {
            modalOkBtn.addEventListener('click', () => modal.hide());
        }
    }
    
    // ===== 3. ACCORDION COMPONENT =====
    const accordionItems: AccordionItem[] = [
        {
            header: 'How long does the battery last?',
            content: 'Up to 7-10 days on a single charge with normal usage.'
        },
        {
            header: 'Is it waterproof?',
            content: 'Yes, completely waterproof and safe to wash.'
        },
        {
            header: 'Does it work with iPhone and Android?',
            content: 'Yes, compatible with both iOS and Android devices.'
        },
        {
            header: 'What\'s the warranty period?',
            content: '1 year warranty for Pro plan, 2 years for Premium.'
        }
    ];
    
    const accordionContainer = document.getElementById('faq-accordion');
    if (accordionContainer) {
        const accordion = new Accordion('faq-accordion', accordionItems);
        console.log('Accordion initialized');
    }
    
    // ===== 4. FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    
    if (contactForm) {
        // Email validation
        function validateEmail(email: string): boolean {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Form validation helper
        function validateForm(): boolean {
            let isValid = true;
            
            const nameInput = document.getElementById('name') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            
            // Validate name
            if (!nameInput.value.trim()) {
                if (nameError) {
                    nameError.textContent = 'Name is required';
                    nameError.style.display = 'block';
                }
                nameInput.classList.add('error');
                isValid = false;
            } else {
                if (nameError) nameError.style.display = 'none';
                nameInput.classList.remove('error');
            }
            
            // Validate email
            const emailValue = emailInput.value.trim();
            if (!emailValue) {
                if (emailError) {
                    emailError.textContent = 'Email is required';
                    emailError.style.display = 'block';
                }
                emailInput.classList.add('error');
                isValid = false;
            } else if (!validateEmail(emailValue)) {
                if (emailError) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.display = 'block';
                }
                emailInput.classList.add('error');
                isValid = false;
            } else {
                if (emailError) emailError.style.display = 'none';
                emailInput.classList.remove('error');
            }
            
            return isValid;
        }
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                // Show success modal
                window.showModal('Success!', 'Your message has been sent successfully.');
                contactForm.reset();
            }
        });
        
        // Real-time validation
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        
        if (nameInput) {
            nameInput.addEventListener('blur', () => validateForm());
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateForm());
        }
    }
    
    // ===== 5. BUTTON ACTIONS =====
    // Buy Now Button
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            window.showModal('Order Placed', 'Thank you for your purchase! You will be redirected to checkout.');
        });
    }
    
    // Learn More Button
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            window.showModal('Mobile App Demo', 'The mobile app demo will open in a new window.');
        });
    }
    
    // Pricing Plan Buttons
    const pricingButtons = document.querySelectorAll('.card--pricing .btn');
    pricingButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const planNames = ['Basic', 'Pro', 'Premium'];
            const planName = planNames[index] || 'Plan';
            window.showModal('Plan Selected', `You have selected the ${planName} plan! We will contact you shortly.`);
        });
    });
    
    // ===== 6. INTERACTIVE FEATURES =====
    // Interactive Bottle
    const animatedBottle = document.getElementById('animated-bottle');
    if (animatedBottle) {
        animatedBottle.style.cursor = 'pointer';
        animatedBottle.addEventListener('click', () => {
            const waterFill = animatedBottle.querySelector('.water-fill') as HTMLElement;
            const percentage = animatedBottle.querySelector('.percentage') as HTMLElement;
            
            if (waterFill && percentage) {
                // Animate water level
                let currentLevel = parseInt(waterFill.style.height || '75');
                currentLevel = currentLevel >= 100 ? 25 : currentLevel + 25;
                waterFill.style.height = `${currentLevel}%`;
                percentage.textContent = `${currentLevel}%`;
                
                // Change temperature
                const tempElement = animatedBottle.querySelector('.temp');
                if (tempElement) {
                    let currentTemp = parseInt(tempElement.textContent || '22');
                    currentTemp = currentTemp > 25 ? 18 : currentTemp + 1;
                    tempElement.textContent = `${currentTemp}°C`;
                }
            }
        });
    }
    
    // Feature Bubble
    const featureBubble = document.getElementById('feature-bubble');
    if (featureBubble) {
        featureBubble.addEventListener('mouseenter', () => {
            featureBubble.style.transform = 'translateY(-5px)';
            featureBubble.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        featureBubble.addEventListener('mouseleave', () => {
            featureBubble.style.transform = 'translateY(0)';
            featureBubble.style.boxShadow = '';
        });
    }
    
    console.log('Smart Water Bottle - Initialization complete!');
});