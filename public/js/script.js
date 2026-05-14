document.addEventListener("DOMContentLoaded", function() {
    // Loading Animation
    const loaderWrapper = document.querySelector(".loader-wrapper");
    if (loaderWrapper) {
        setTimeout(() => {
            loaderWrapper.classList.add("hidden");
        }, 500);
    }

    // Sticky Navbar & Active Link Highlighting
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        // Highlight active nav link based on scroll position
        let current = "home";
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - navbar.offsetHeight && scrollY < sectionTop + sectionHeight - navbar.offsetHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                if (document.querySelector(hash)) {
                    window.scrollTo({
                        top: document.querySelector(hash).offsetTop - navbar.offsetHeight,
                        behavior: "smooth"
                    });
                } else if (hash === "#home") { // Special case for home
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Mobile Navigation (Burger Menu)
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    // Animated Counters
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // The lower the speed, the faster the counter

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const inc = target / speed;

        const updateCounter = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    };

    const countersSection = document.querySelector(".counters-section");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    if (countersSection) {
        observer.observe(countersSection);
    }

    // Contact Form Submission (Example - no backend for this frontend)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Thank you for your inquiry! We will get back to you shortly.");
            this.reset();
        });
    }

    // Add sticky class to navbar after initial load if scrolled
    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    }
});
