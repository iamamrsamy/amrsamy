/* ==========================================
   AMR SAMY — MAGIC DIGITAL CARD
========================================== */
const card =
  document.getElementById("magicCard");
const flipButton =
  document.getElementById("flipButton");
const saveButton =
  document.getElementById("saveButton");
const shareButton =
  document.getElementById("shareButton");
const qrButton =
  document.getElementById("qrButton");
const qrBox =
  document.getElementById("qrBox");
const canvas =
  document.getElementById("magicCanvas");
const ctx =
  canvas.getContext("2d");
/* ==========================================
   CARD FLIP
========================================== */
function flipCard() {
  card.classList.toggle("flipped");
  if (card.classList.contains("flipped")) {
    card.style.transform =
      "rotateY(180deg)";
    flipButton.innerHTML =
      "<span>♦</span> FLIP BACK";
  } else {
    card.style.transform =
      "rotateY(0deg)";
    flipButton.innerHTML =
      "<span>♠</span> REVEAL MAGIC";
  }
}
card.addEventListener(
  "click",
  flipCard
);
flipButton.addEventListener(
  "click",
  flipCard
);
/* ==========================================
   3D MOUSE MAGIC
========================================== */
document.addEventListener(
  "mousemove",
  event => {
    if (
      window.innerWidth < 750
    ) return;
    const x =
      event.clientX /
      window.innerWidth -
      .5;
    const y =
      event.clientY /
      window.innerHeight -
      .5;
    const rx =
      y * -6;
    const ry =
      x * 9;
    if (
      card.classList.contains("flipped")
    ) {
      card.style.transform =
        `
        rotateX(${rx}deg)
        rotateY(${180 + ry}deg)
        `;
    } else {
      card.style.transform =
        `
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        `;
    }
  }
);
/* ==========================================
   MOBILE TILT
========================================== */
window.addEventListener(
  "deviceorientation",
  event => {
    if (
      window.innerWidth > 750
    ) return;
    const gamma =
      event.gamma || 0;
    const beta =
      event.beta || 0;
    const ry =
      Math.max(
        -7,
        Math.min(
          7,
          gamma / 4
        )
      );
    const rx =
      Math.max(
        -5,
        Math.min(
          5,
          (beta - 45) / 5
        )
      );
    if (
      card.classList.contains("flipped")
    ) {
      card.style.transform =
        `
        rotateX(${rx}deg)
        rotateY(${180 + ry}deg)
        `;
    } else {
      card.style.transform =
        `
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        `;
    }
  }
);
/* ==========================================
   MAGIC PARTICLES
========================================== */
let particles = [];
function resizeCanvas() {
  canvas.width =
    window.innerWidth;
  canvas.height =
    window.innerHeight;
}
resizeCanvas();
window.addEventListener(
  "resize",
  resizeCanvas
);
const symbols = [
  "✦",
  "✧",
  "♠",
  "♥",
  "♦",
  "♣"
];
class Particle {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x =
      Math.random() *
      canvas.width;
    this.y =
      initial
        ? Math.random() *
          canvas.height
        : canvas.height + 20;
    this.speed =
      Math.random() *
      .55 + .15;
    this.size =
      Math.random() *
      1.5 + .4;
    this.opacity =
      Math.random() *
      .55 + .1;
    this.symbol =
      Math.random() >
      .88
        ? symbols[
            Math.floor(
              Math.random() *
              symbols.length
            )
          ]
        : null;
  }
  update() {
    this.y -=
      this.speed;
    this.x +=
      Math.sin(
        this.y * .01
      ) * .12;
    if (
      this.y < -30
    ) {
      this.reset();
    }
  }
  draw() {
    ctx.globalAlpha =
      this.opacity;
    ctx.fillStyle =
      "#d4af37";
    if (this.symbol) {
      ctx.font =
        `${this.size * 8}px Georgia`;
      ctx.fillText(
        this.symbol,
        this.x,
        this.y
      );
    } else {
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
}
function createParticles() {
  particles = [];
  const amount =
    window.innerWidth < 600
      ? 45
      : 100;
  for (
    let i = 0;
    i < amount;
    i++
  ) {
    particles.push(
      new Particle()
    );
  }
}
createParticles();
function animate() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
  particles.forEach(
    particle => {
      particle.update();
      particle.draw();
    }
  );
  ctx.globalAlpha = 1;
  requestAnimationFrame(
    animate
  );
}
animate();
/* ==========================================
   MAGIC EXPLOSION
========================================== */
function explosion(x, y) {
  for (
    let i = 0;
    i < 35;
    i++
  ) {
    const angle =
      Math.random() *
      Math.PI * 2;
    const speed =
      Math.random() *
      4 + 1;
    const p = {
      x,
      y,
      vx:
        Math.cos(angle) *
        speed,
      vy:
        Math.sin(angle) *
        speed,
      life: 1
    };
    const start =
      performance.now();
    function animateSpark(time) {
      const progress =
        (time - start) /
        800;
      p.x += p.vx;
      p.y += p.vy;
      p.life =
        1 - progress;
      ctx.globalAlpha =
        Math.max(
          0,
          p.life
        );
      ctx.fillStyle =
        "#d4af37";
      ctx.beginPath();
      ctx.arc(
        p.x,
        p.y,
        1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
      if (
        p.life > 0
      ) {
        requestAnimationFrame(
          animateSpark
        );
      }
    }
    requestAnimationFrame(
      animateSpark
    );
  }
}
card.addEventListener(
  "click",
  event => {
    explosion(
      event.clientX,
      event.clientY
    );
  }
);
/* ==========================================
   SAVE CONTACT
========================================== */
saveButton.addEventListener(
  "click",
  () => {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
ORG:Amr Samy The Magician
TITLE:The Magician
TEL;TYPE=CELL:+201115552621
EMAIL:amrsamydxb@gmail.com
URL:https://iamamrsamy.github.io/amrsamy/
URL:https://instagram.com/iamamrsamy
NOTE:Magician & Entertainer
END:VCARD
`;
    const blob =
      new Blob(
        [vcard],
        {
          type:
            "text/vcard;charset=utf-8"
        }
      );
    const url =
      URL.createObjectURL(
        blob
      );
    const link =
      document.createElement("a");
    link.href = url;
    link.download =
      "Amr-Samy.vcf";
    document.body.appendChild(
      link
    );
    link.click();
    link.remove();
    URL.revokeObjectURL(
      url
    );
    saveButton.innerHTML =
      "✓ CONTACT SAVED";
    setTimeout(
      () => {
        saveButton.innerHTML =
          "♧ SAVE CONTACT";
      },
      2500
    );
  }
);
/* ==========================================
   SHARE
========================================== */
shareButton.addEventListener(
  "click",
  async () => {
    const data = {
      title:
        "Amr Samy — The Magician",
      text:
        "Enter the magic ✦",
      url:
        window.location.href
    };
    if (
      navigator.share
    ) {
      try {
        await navigator.share(
          data
        );
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(
          window.location.href
        );
        shareButton.innerHTML =
          "✓ LINK COPIED";
        setTimeout(
          () => {
            shareButton.innerHTML =
              "↗ SHARE";
          },
          2000
        );
      } catch (e) {
        alert(
          window.location.href
        );
      }
    }
  }
);
/* ==========================================
   QR CODE
========================================== */
qrButton.addEventListener(
  "click",
  () => {
    qrBox.classList.toggle(
      "show"
    );
    if (
      qrBox.classList.contains("show") &&
      !document
        .getElementById("qrcode")
        .hasChildNodes()
    ) {
      new QRCode(
        document.getElementById(
          "qrcode"
        ),
        {
          text:
            "https://iamamrsamy.github.io/amrsamy/",
          width: 145,
          height: 145,
          colorDark:
            "#000000",
          colorLight:
            "#ffffff",
          correctLevel:
            QRCode.CorrectLevel.H
        }
      );
    }
  }
);
/* ==========================================
   RANDOM MAGIC CARD SYMBOL
========================================== */
setInterval(
  () => {
    const suit =
      document.createElement(
        "div"
      );
    const list = [
      "♠",
      "♥",
      "♦",
      "♣"
    ];
    suit.innerHTML =
      list[
        Math.floor(
          Math.random() *
          list.length
        )
      ];
    suit.style.position =
      "fixed";
    suit.style.left =
      Math.random() *
      100 +
      "vw";
    suit.style.bottom =
      "-30px";
    suit.style.zIndex =
      "3";
    suit.style.pointerEvents =
      "none";
    suit.style.color =
      Math.random() > .5
        ? "#d4af37"
        : "#9a2929";
    suit.style.fontFamily =
      "Georgia";
    suit.style.fontSize =
      Math.random() *
      15 + 10 +
      "px";
    const duration =
      Math.random() *
      4000 + 4000;
    suit.animate(
      [
        {
          transform:
            "translateY(0) rotate(0)",
          opacity: 0
        },
        {
          transform:
            "translateY(-110vh) rotate(360deg)",
          opacity: .5
        }
      ],
      {
        duration,
        easing:
          "linear"
      }
    );
    document.body.appendChild(
      suit
    );
    setTimeout(
      () => suit.remove(),
      duration
    );
  },
  1200
);