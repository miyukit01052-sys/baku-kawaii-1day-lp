// Import styles
import './style.css'

console.log('爆かわマインド1Day講座 LP Initialized!');

document.addEventListener('DOMContentLoaded', () => {
    // Handle Plan Selection from CTA Buttons
    const planButtons = document.querySelectorAll('.plan-cta');
    const planSelect = document.getElementById('plan');

    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Allow default anchor jump to #registration
            const selectedPlan = button.getAttribute('data-plan');

            if (selectedPlan && planSelect) {
                // Find the matching option and set it as selected
                for (let i = 0; i < planSelect.options.length; i++) {
                    if (planSelect.options[i].value === selectedPlan) {
                        planSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    // Handle Form Submission (Demo only for now)
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission for demo

            const submitBtn = applyForm.querySelector('.submit-cta');
            const originalText = submitBtn.textContent;

            // Visual feedback
            submitBtn.textContent = '送信しています...♡';
            submitBtn.style.opacity = '0.7';

            // Get form values (for demo purposes)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const plan = document.getElementById('plan').value;
            const instaCheckbox = document.getElementById('insta_dm');

            setTimeout(() => {
                alert('お申し込みありがとうございます！\nご入力いただいたメールアドレスに詳細をお送りしました♡\n（※現在はデモ画面のため、実際には送信されていません）');
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                applyForm.reset();
            }, 1000);
        });
    }

    // --- Scroll Animations ---
    const animatedSelectors = [
        '.section-title',
        '.empathy-message',
        '.empathy-item',
        '.concept-intro',
        '.feature-card',
        '.step-card',
        '.profile-wrapper',
        '.pricing-intro',
        '.pricing-card',
        '.form-intro',
        '.form-container',
        '.faq-item'
    ];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const parentGroups = new Map();

    document.querySelectorAll(animatedSelectors.join(', ')).forEach(el => {
        el.classList.add('fade-in-up');

        const container = el.parentElement;
        if (!parentGroups.has(container)) {
            parentGroups.set(container, []);
        }
        parentGroups.get(container).push(el);

        observer.observe(el);
    });

    parentGroups.forEach(group => {
        if (group.length > 1 && !group.some(el => el.classList.contains('section-title'))) {
            group.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.15}s`;
            });
        }
    });
});
