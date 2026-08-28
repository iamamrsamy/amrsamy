/* =========================================
   AMR SAMY — MAGIC EXPERIENCE
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const intro =
  document.getElementById("intro");

const enterMagic =
  document.getElementById("enterMagic");

const experience =
  document.getElementById("experience");

const card =
  document.getElementById("magicCard");

const saveContact =
  document.getElementById("saveContact");

const shareButton =
  document.getElementById("shareButton");

const qrButton =
  document.getElementById("qrButton");

const qrBox =
  document.getElementById("qrBox");


/* =========================================
   ENTER MAGIC
========================================= */

enterMagic.addEventListener(
  "click",
  () => {

    enterMagic.innerHTML =
      "THE MAGIC BEGINS...";

    setTimeout(() => {

      intro.classList.add("hide");

      document.body.style.overflow =
        "auto";

    }, 600);

  }
);


/* =========================================
   3D CARD — DESKTOP
========================================= */

document.addEventListener(
  "mousemove",
  (event) => {

    if (
      window.innerWidth < 700
    ) return;


    const x =
      (event.clientX /
      window.innerWidth) - .5;


    const y =
      (event.clientY /
      window.innerHeight) - .5;


    const rotateX =
      y * -12;


    const rotateY =
      x * 15;


    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;

  }
);


/* =========================================
   RESET CARD
========================================= */

document.addEventListener(
  "mouseleave",
  () => {

    card.style.transform =
      "rotateX(0deg) rotateY(0deg)";

  }
);


/* =========================================
   MOBILE TOUCH MAGIC
========================================= */

let touchStartX = 0;

let touchStartY = 0;


card.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.touches[0].clientX;

    touchStartY =
      event.touches[0].clientY;

  }
);


card.addEventListener(
  "touchmove",
  (event) => {

    const currentX =
      event.touches[0].clientX;

    const currentY =
      event.touches[0].clientY;


    const deltaX =
      currentX - touchStartX;

    const deltaY =
      currentY - touchStartY;


    const rotateY =
      deltaX * .12;

    const rotateX =
      deltaY * -.12;


    card.querySelector(
      ".card-inner"
    ).style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

  }
);


card.addEventListener(
  "touchend",
  () => {

    card.querySelector(
      ".card-inner"
    ).style.transform =
      "rotateX(0deg) rotateY(0deg)";

  }
);


/* =========================================
   SAVE CONTACT
========================================= */

saveContact.addEventListener(
  "click",
  () => {

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
NOTE:Professional Magician & Entertainer
END:VCARD
`;


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


    setTimeout(
      () => {

        saveContact.innerHTML =
          "<span>♣</span> SAVE CONTACT";

      },
      2500
    );

  }
);


/* =========================================
   SHARE
========================================= */

shareButton.addEventListener(
  "click",
  async () => {

    const data = {

      title:
        "Amr Samy — The Magician",

      text:
        "Enter the magic ✦",

      url:
        "https://iamamrsamy.github.io/amrsamy/"

    };


    if (
      navigator.share
    ) {

      try {

        await navigator.share(
          data
        );

      }

      catch (error) {}

    }

    else {

      try {

        await navigator.clipboard.writeText(
          data.url
        );


        shareButton.innerHTML =
          "✓ LINK COPIED";


        setTimeout(
          () => {

            shareButton.innerHTML =
              "<span>↗</span> SHARE MAGIC";

          },
          2000
        );

      }

      catch (error) {

        alert(data.url);

      }

    }

  }
);


/* =========================================
   QR CODE
========================================= */

qrButton.addEventListener(
  "click",
  () => {

    qrBox.classList.toggle(
      "show"
    );


    if (
      qrBox.classList.contains("show") &&
      qrBox.children.length === 0
    ) {

      new QRCode(
        qrBox,
        {

          text:
            "https://iamamrsamy.github.io/amrsamy/",

          width: 160,

          height: 160,

          colorDark:
            "#000000",

          colorLight:
            "#ffffff",

          correctLevel:
            QRCode.CorrectLevel.H

        }
      );

    }


    if (
      qrBox.classList.contains("show")
    ) {

      qrButton.innerHTML =
        "<span>×</span> HIDE QR";

    }

    else {

      qrButton.innerHTML =
        "<span>▦</span> REVEAL MY QR";

    }

  }
);


/* =========================================
   MAGIC PARTICLES
========================================= */

function createMagicParticle() {

  const particle =
    document.createElement("div");


  particle.innerHTML =
    Math.random() > .5
      ? "✦"
      : "♦";


  particle.style.position =
    "fixed";


  particle.style.left =
    Math.random() * 100 + "vw";


  particle.style.bottom =
    "-20px";


  particle.style.color =
    Math.random() > .7
      ? "#8e1827"
      : "#d4af37";


  particle.style.fontSize =
    Math.random() * 8 + 5 + "px";


  particle.style.opacity =
    "0";


  particle.style.pointerEvents =
    "none";


  particle.style.zIndex =
    "3";


  const duration =
    Math.random() * 5000 + 5000;


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
            "translateY(-110vh) rotate(360deg)",
          opacity: .5
        },

        {
          transform:
            "translateY(-120vh) rotate(700deg)",
          opacity: 0
        }

      ],

      {

        duration:

          duration,

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
  900
);


/* =========================================
   RANDOM CARD FLASH
========================================= */

const suits = [
  "♠",
  "♥",
  "♦",
  "♣"
];


function magicFlash() {

  const flash =
    document.createElement("div");


  flash.innerText =
    suits[
      Math.floor(
        Math.random() *
        suits.length
      )
    ];


  flash.style.position =
    "fixed";


  flash.style.left =
    Math.random() * 90 + 5 + "vw";


  flash.style.top =
    Math.random() * 90 + 5 + "vh";


  flash.style.fontFamily =
    "Georgia, serif";


  flash.style.fontSize =
    "20px";


  flash.style.color =
    "#d4af37";


  flash.style.opacity =
    "0";


  flash.style.pointerEvents =
    "none";


  flash.style.zIndex =
    "2";


  document.body.appendChild(
    flash
  );


  flash.animate(

    [

      {
        opacity: 0,
        transform:
          "scale(.5) rotate(-20deg)"
      },

      {
        opacity: .3,
        transform:
          "scale(1) rotate(0deg)"
      },

      {
        opacity: 0,
        transform:
          "scale(1.5) rotate(20deg)"
      }

    ],

    {

      duration: 1800,

      easing: "ease-out"

    }

  ).onfinish =
    () => flash.remove();

}


setInterval(
  magicFlash,
  3500
);