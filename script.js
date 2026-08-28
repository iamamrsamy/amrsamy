/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* ================= CLOSE MENU AFTER CLICK ================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        alert("Please fill in all fields.");

        return;

    }


    /*
        WhatsApp message
    */

    const whatsappNumber = "201115552621";

    const whatsappMessage =
        `Hello Amr Samy 👋

My name is: ${name}

Phone: ${phone}

Event details:
${message}`;


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


    window.open(whatsappURL, "_blank");


    contactForm.reset();

});


/* ================= CARD MOUSE EFFECT ================= */

const card = document.querySelector(".hero-card");

if (card) {

    document.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 650) return;

        const x =
            (window.innerWidth / 2 - e.clientX) / 80;

        const y =
            (window.innerHeight / 2 - e.clientY) / 80;

        card.style.transform =
            `perspective(1000px)
             rotateY(${x}deg)
             rotateX(${y}deg)`;

    });

}


/* ================= REVEAL ANIMATION ================= */

const revealElements =
    document.querySelectorAll(
        ".section-title, .about-card, .show-card, .contact-item, .contact-form"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("hidden");

    observer.observe(element);

});