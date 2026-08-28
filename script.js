/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);

  }, 1800);

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  follower.animate(
    {
      left: e.clientX + "px",
      top: e.clientY + "px"
    },
    {
      duration: 500,
      fill: "forwards"
    }
  );

});


/* =========================
   PARTICLES
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 1.5 + .3;

    this.speedX = (Math.random() - .5) * .3;
    this.speedY = (Math.random() - .5) * .3;

  }


  update() {

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;

    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

  }


  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(212,175,55,.6)";

    ctx.fill();

  }

}


function createParticles() {

  particles = [];

  const amount =
    window.innerWidth < 600 ? 50 : 120;

  for (let i = 0; i < amount; i++) {

    particles.push(new Particle());

  }

}


createParticles();


function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(p => {

    p.update();
    p.draw();

  });

  requestAnimationFrame(animateParticles);

}

animateParticles();


/* =========================
   3D MAGIC CARDS
========================= */

const cards =
  document.querySelectorAll(".magic-card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - .5) * -10;

    const rotateY =
      ((x / rect.width) - .5) * 10;

    card.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-10px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(800px) rotateX(0) rotateY(0)";

  });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(
    ".section-title, .about-text, .magic-card, .contact-card, .social-section"
  );


revealElements.forEach(el => {

  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition =
    "opacity 1s ease, transform 1s ease";

});


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .15
    }
  );


revealElements.forEach(el => {

  observer.observe(el);

});


/* =========================
   MAGNETIC BUTTONS
========================= */

const buttons =
  document.querySelectorAll(
    ".magic-button, .big-magic-button, .nav-button"
  );


buttons.forEach(button => {

  button.addEventListener("mousemove", e => {

    const rect =
      button.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * .12}px, ${y * .12}px)`;

  });


  button.addEventListener("mouseleave", () => {

    button.style.transform =
      "translate(0,0)";

  });

});


/* =========================
   RANDOM MAGIC SYMBOLS
========================= */

const symbols =
  ["♠", "♥", "♣", "♦"];

setInterval(() => {

  if (window.innerWidth < 600) return;

  const symbol =
    document.createElement("div");

  symbol.innerHTML =
    symbols[
      Math.floor(Math.random() * symbols.length)
    ];

  symbol.style.position = "fixed";
  symbol.style.left =
    Math.random() * 100 + "vw";

  symbol.style.bottom = "-30px";

  symbol.style.color =
    Math.random() > .5
      ? "#d4af37"
      : "#ffffff";

  symbol.style.fontSize =
    Math.random() * 20 + 12 + "px";

  symbol.style.opacity = ".5";

  symbol.style.pointerEvents = "none";

  symbol.style.zIndex = "1";

  document.body.appendChild(symbol);


  const duration =
    Math.random() * 4000 + 4000;


  symbol.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: 0
      },
      {
        transform:
          `translateY(-110vh)
           rotate(360deg)`,
        opacity: .6
      }
    ],
    {
      duration: duration,
      easing: "linear"
    }
  );


  setTimeout(() => {

    symbol.remove();

  }, duration);


}, 900);


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 200;

    if (scrollY >= sectionTop) {

      current = section.getAttribute("id");

    }

  });


  navLinks.forEach(link => {

    link.style.color = "";

    if (
      link.getAttribute("href") === "#" + current
    ) {

      link.style.color = "#d4af37";

    }

  });

});