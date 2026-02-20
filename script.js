// script-v3.js

// 1. Typed.js Init
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#type-v3')) {
        new Typed('#type-v3', {
            strings: ["DEVELOPER.", "DESIGNER.", "CREATOR."],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            cursorChar: '_'
        });
    }
});

// 2. Custom Cursor
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile && cursor && cursor2) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursor2.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Hover effects on interactive elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .carousel-item');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = cursor.style.transform + ' scale(1.5)';
            cursor.style.borderColor = 'var(--accent-pink)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.borderColor = 'var(--accent-cyan)';
        });
    });
}

// 3. Carousel Logic
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;
let activeCategory = 'fullstack';

const speedWheel = 0.02; // Keep it smooth
const speedDrag = -0.1;

const $items = document.querySelectorAll('.carousel-item');

const getZindex = (array, index) =>
    array.map((_, i) =>
        index === i ? array.length : array.length - Math.abs(index - i)
    );

const displayItems = (item, index, activeIdx) => {
    const virtualTotal = 10;
    const zIndex = getZindex([...Array(virtualTotal)], activeIdx)[index];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', (index - activeIdx) / virtualTotal);
};

const animate = () => {
    progress = Math.max(0, Math.min(progress, 100));

    const category = typeof activeCategory !== 'undefined' ? activeCategory : 'fullstack';
    const visibleItems = Array.from($items).filter(item => item.getAttribute('data-category') === category);

    if (visibleItems.length === 0) return;

    active = Math.floor((progress / 100) * (visibleItems.length - 1));

    visibleItems.forEach((item, index) => displayItems(item, index, active));
};

// Interaction Handlers for Carousel
const handleWheel = (e) => {
    const carouselSection = document.getElementById('projects');
    if (!carouselSection) return;
    const rect = carouselSection.getBoundingClientRect();

    // If we are looking right at the carousel section
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        const wheelProgress = e.deltaY * speedWheel;
        progress = progress + wheelProgress;
        animate();
    }
};

const handleMouseMove = (e) => {
    if (!isDown) return;
    if (e.target.tagName.toLowerCase() === 'a') return;

    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
};

const handleMouseDown = (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
        isDown = false;
        return;
    }

    if (e.target.closest('#projects')) {
        isDown = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    }
};

const handleMouseUp = () => { isDown = false; };

document.addEventListener("wheel", handleWheel, { passive: true });
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);

// Filter logic for projects
const toggles = document.querySelectorAll('.project-toggle');

// Initial filter setup
const updateFilter = () => {
    // Hide or show items based on category
    $items.forEach(item => {
        if (item.getAttribute('data-category') === activeCategory) {
            item.style.display = 'block';
            item.style.opacity = '';
            item.style.pointerEvents = 'auto';
        } else {
            item.style.opacity = '0';
            item.style.pointerEvents = 'none';
            item.style.display = 'none';
        }
    });

    // Reset progress and re-animate only visible items
    progress = 50;
    animate();
};

toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Update active class
        toggles.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Update category and trigger filter
        activeCategory = e.target.getAttribute('data-filter');
        updateFilter();
    });
});

// Run initial filter on load
updateFilter();

// Click directly on an item to bring it to front
$items.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        // Exclude links
        if (e.target.tagName.toLowerCase() === 'a') return;

        // Only allow clicking on currently visible items
        if (item.getAttribute('data-category') !== activeCategory) return;

        // Find the relative index of THIS item inside the dynamically filtered array
        const visibleItems = Array.from($items).filter(el => el.getAttribute('data-category') === activeCategory);
        const relativeIndex = visibleItems.indexOf(item);

        if (relativeIndex === -1) return;

        progress = (relativeIndex / (visibleItems.length - 1)) * 100;

        if (progress === 0) progress += 0.1;
        if (progress === 100) progress -= 0.1;

        animate();
    });
});

// 4. Form Submission (EmailJS Integration)
const form = document.getElementById('contact-form-v3');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span>';

        // Gather form data
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_name: 'Akshat', // Your name
            reply_to: document.getElementById('email').value,
        };

        // Send using EmailJS 
        emailjs.send(
            'service_2kqs98p',
            'template_kusxm9n',
            templateParams,
            'nt3GA5xrzE1XAp9iy'
        )
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                btn.innerHTML = '<span>Sent Successfully!</span>';
                btn.style.background = '#4CAF50'; // Green success state
                btn.style.color = '#fff';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = ''; // Revert to original
                    btn.style.color = '';
                }, 3000);
            }, function (error) {
                console.log('FAILED...', error);
                alert("EmailJS Error: " + (error.text || error.message || JSON.stringify(error)));
                btn.innerHTML = '<span>Error! Try Again.</span>';
                btn.style.background = '#f44336'; // Red error state
                btn.style.color = '#fff';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            });
    });
}
