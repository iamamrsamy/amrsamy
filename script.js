/* =========================================
   AMR SAMY MAGIC CARD
========================================= */
/* =========================================
   ELEMENTS
========================================= */
const magicCard = document.getElementById("magicCard");
const revealBtn = document.getElementById("revealBtn");
const shareBtn = document.getElementById("shareBtn");
const saveBtn = document.getElementById("saveBtn");
const qrBtn = document.getElementById("qrBtn");
const qrBox = document.getElementById("qrBox");
const canvas = document.getElementById("magicCanvas");
const ctx = canvas.getContext("2d");
/* =========================================
   CARD FLIP
========================================= */
function revealMagic() {
  magicCard.classList.toggle("flipped");
  if (magicCard.classList.contains("flipped")) {
    revealBtn.innerHTML =
      "<span>♠</span> HIDE MAGIC";
  } else {
    revealBtn.innerHTML =
      "<span>🪄</span> REVEAL MAGIC";
  }
}
magicCard.addEventListener("click", revealMagic);
revealBtn.addEventListener("click", revealMagic);
/* =========================================
   3D CARD MOVEMENT
========================================= */
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth < 700) return;
  const x =
    (e.clientX / window.innerWidth - .5);
  const y =
    (e.clientY / window.innerHeight - .5);
  const rotateX = y * -5;
  const rotateY = x * 7;
  if (!magicCard.classList.contains("flipped")) {
    magicCard.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;
  } else {
    magicCard.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${rotateY + 180}deg)`;
  }
});
magicCard.addEventListener("mouseleave", () => {
  if (magicCard.classList.contains("flipped")) {
    magicCard.style.transform =
      "rotateY(180deg)";
  } else {
    magicCard.style.transform =
      "rotateY(0deg)";
  }
});
/* =========================================
   MOBILE DEVICE TILT
========================================= */
window.addEventListener("deviceorientation", (event) => {
  if (window.innerWidth > 700) return;
  const x = event.gamma || 0;
  const y = event.beta || 0;
  const rotateY =
    Math.max(-7, Math.min(7, x / 4));
  const rotateX =
    Math.max(-5, Math.min(5, (y - 45) / 5));
  if (magicCard.classList.contains("flipped")) {
    magicCard.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${180 + rotateY}deg)`;
  } else {
    magicCard.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;
  }
});
/* =========================================
   PARTICLE MAGIC
========================================= */
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
class MagicParticle {
  constructor() {
    this.reset();
    this.y =
      Math.random() * canvas.height;
  }
  reset() {
    this.x =
      Math.random() * canvas.width;
    this.y =
      canvas.height + Math.random() * 100;
    this.size =
      Math.random() * 1.7 + .4;
    this.speed =
      Math.random() * .5 + .15;
    this.opacity =
      Math.random() * .6 + .15;
    this.symbol =
      Math.random() > .82
        ? ["✦", "✧", "♠", "♦"][Math.floor(Math.random() * 4)]
        : null;
  }
  update() {
    this.y -= this.speed;
    this.x +=
      Math.sin(this.y * .008) * .15;
    if (this.y < -20) {
      this.reset();
    }
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#d4af37";
    if (this.symbol) {
      ctx.font =
        `${this.size * 9}px Georgia`;
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
  for (let i = 0; i < amount; i++) {
    particles.push(
      new MagicParticle()
    );
  }
}
createParticles();
function animateMagic() {
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(
    animateMagic
  );
}
animateMagic();
/* =========================================
   MAGIC SPARK EXPLOSION
========================================= */
function magicExplosion(x, y) {
  for (let i = 0; i < 25; i++) {
    const angle =
      Math.random() * Math.PI * 2;
    const speed =
      Math.random() * 4 + 1;
    const particle = {
      x,
      y,
      vx:
        Math.cos(angle) * speed,
      vy:
        Math.sin(angle) * speed,
      life: 1
    };
    const start =
      performance.now();
    function animateSpark(time) {
      const elapsed =
        (time - start) / 700;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life =
        1 - elapsed;
      ctx.globalAlpha =
        Math.max(0, particle.life);
      ctx.fillStyle =
        "#d4af37";
      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      if (particle.life > 0) {
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
/* =========================================
   CLICK MAGIC
========================================= */
magicCard.addEventListener("click", (e) => {
  magicExplosion(
    e.clientX,
    e.clientY
  );
});
/* =========================================
   SHARE
========================================= */
shareBtn.addEventListener("click", async () => {
  const shareData = {
    title:
      "Amr Samy | The Magician",
    text:
      "Check out Amr Samy's Digital Magic Card ✨",
    url:
      window.location.href
  };
  if (navigator.share) {
    try {
      await navigator.share(
        shareData
      );
    } catch (error) {}
  } else {
    await navigator.clipboard.writeText(
      window.location.href
    );
    shareBtn.innerHTML =
      "✓ LINK COPIED";
    setTimeout(() => {
      shareBtn.innerHTML =
        "↗ SHARE";
    }, 2000);
  }
});
/* =========================================
   SAVE CONTACT
========================================= */
saveBtn.addEventListener("click", () => {
  const vCard = `
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
NOTE:Professional Magician & Entertainer
END:VCARD
`;
  const blob =
    new Blob(
      [vCard],
      { type: "text/vcard" }
    );
  const url =
    URL.createObjectURL(blob);
  const link =
    document.createElement("a");
  link.href = url;
  link.download =
    "Amr-Samy-Contact.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  saveBtn.innerHTML =
    "✓ CONTACT READY";
  setTimeout(() => {
    saveBtn.innerHTML =
      "♡ SAVE CONTACT";
  }, 2500);
});
/* =========================================
   QR CODE
========================================= */
qrBtn.addEventListener("click", () => {
  qrBox.classList.toggle("show");
  if (
    qrBox.classList.contains("show") &&
    !document.getElementById("qrcode").hasChildNodes()
  ) {
    new QRCode(
      document.getElementById("qrcode"),
      {
        text:
          "https://iamamrsamy.github.io/amrsamy/",
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel:
          QRCode.CorrectLevel.H
      }
    );
  }
});
/* =========================================
   WAND SPARKS
========================================= */
setInterval(() => {
  const wand =
    document.querySelector(".wand");
  if (!wand) return;
  const rect =
    wand.getBoundingClientRect();
  magicExplosion(
    rect.left,
    rect.top
  );
}, 3500);
/* =========================================
   TOUCH MAGIC
========================================= */
let touchStartX = 0;
magicCard.addEventListener(
  "touchstart",
  e => {
    touchStartX =
      e.touches[0].clientX;
  },
  { passive: true }
);
magicCard.addEventListener(
  "touchend",
  e => {
    const touchEndX =
      e.changedTouches[0].clientX;
    const difference =
      touchEndX - touchStartX;
    if (Math.abs(difference) > 60) {
      revealMagic();
    }
  }
);
/* =========================================
   PREVENT DOUBLE TAP ZOOM
========================================= */
let lastTouch = 0;
document.addEventListener(
  "touchend",
  e => {
    const now =
      Date.now();
    if (now - lastTouch <= 300) {
      e.preventDefault();
    }
    lastTouch = now;
  },
  { passive: false }
);