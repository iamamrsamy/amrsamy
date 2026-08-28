/* =========================================
   AMR SAMY
   MAGIC DIGITAL CARD
========================================= */
/* =========================================
   REVEAL MAGIC
========================================= */
const revealButton =
  document.getElementById("revealButton");
const content =
  document.getElementById("content");
revealButton.addEventListener(
  "click",
  () => {
    content.classList.add("active");
    revealButton.innerHTML =
      '<span>✦</span><span>THE MAGIC IS OPEN</span>';
    setTimeout(() => {
      content.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 350);
  }
);
/* =========================================
   SAVE CONTACT
========================================= */
const saveContact =
  document.getElementById("saveContact");
saveContact.addEventListener(
  "click",
  () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
ORG:Amr Samy The Magician
TITLE:The Magician
TEL;TYPE=CELL:+201115552621
EMAIL:amrsamydxb@gmail.com
URL:https://iamamrsamy.github.io/amrsamy/
NOTE:Professional Magician & Entertainer
END:VCARD`;
    const blob =
      new Blob(
        [vCard],
        {
          type:
            "text/vcard;charset=utf-8"
        }
      );
    const url =
      URL.createObjectURL(blob);
    const link =
      document.createElement("a");
    link.href = url;
    link.download =
      "Amr-Samy.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    saveContact.innerHTML =
      "✓ CONTACT SAVED";
    setTimeout(() => {
      saveContact.innerHTML =
        "♧ SAVE CONTACT";
    }, 2500);
  }
);
/* =========================================
   SHARE
========================================= */
const shareCard =
  document.getElementById("shareCard");
shareCard.addEventListener(
  "click",
  async () => {
    const data = {
      title:
        "Amr Samy — The Magician",
      text:
        "Meet Amr Samy — The Magician ✦",
      url:
        "https://iamamrsamy.github.io/amrsamy/"
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        await navigator.clipboard.writeText(
          data.url
        );
        shareCard.innerHTML =
          "✓ LINK COPIED";
        setTimeout(() => {
          shareCard.innerHTML =
            "✦ SHARE CARD";
        }, 2000);
      }
      catch {
        alert(data.url);
      }
    }
  }
);
/* =========================================
   MAGIC PARTICLES
========================================= */
function createMagicParticle() {
  const particle =
    document.createElement("div");
  const symbols =
    ["✦", "✧", "·", "♦", "♠"];
  particle.innerText =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];
  particle.style.position =
    "fixed";
  particle.style.left =
    Math.random() * 100 + "vw";
  particle.style.bottom =
    "-20px";
  particle.style.zIndex =
    "1";
  particle.style.pointerEvents =
    "none";
  particle.style.color =
    Math.random() > .85
      ? "#8c1728"
      : "#c9a74a";
  particle.style.fontSize =
    (Math.random() * 8 + 5) + "px";
  const animation =
    particle.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translateY(-45vh) rotate(180deg)",
          opacity: .45
        },
        {
          transform:
            "translateY(-100vh) rotate(360deg)",
          opacity: 0
        }
      ],
      {
        duration:
          Math.random() * 5000 + 5000,
        easing:
          "linear"
      }
    );
  document.body.appendChild(
    particle
  );
  animation.onfinish =
    () => particle.remove();
}
setInterval(
  createMagicParticle,
  1000
);
/* =========================================
   DESKTOP 3D CARD MOVEMENT
========================================= */
const logo =
  document.querySelector(".magic-logo");
if (window.innerWidth > 700) {
  document.addEventListener(
    "mousemove",
    (event) => {
      const x =
        (event.clientX /
          window.innerWidth -
          .5) * 8;
      const y =
        (event.clientY /
          window.innerHeight -
          .5) * 8;
      logo.style.transform =
        `translate(${x}px, ${y}px)`;
    }
  );
}