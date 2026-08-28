/* =====================================
   AMR SAMY MAGIC CARD
===================================== */

const card =
  document.getElementById("magicCard");

const cursorGlow =
  document.querySelector(".cursor-glow");

const saveContact =
  document.getElementById("saveContact");

const shareCard =
  document.getElementById("shareCard");

const qrButton =
  document.getElementById("qrButton");

const qrContainer =
  document.getElementById("qrContainer");


/* =====================================
   MOUSE LIGHT
===================================== */

document.addEventListener(
  "mousemove",
  (e) => {

    cursorGlow.style.left =
      e.clientX + "px";

    cursorGlow.style.top =
      e.clientY + "px";

  }
);


/* =====================================
   3D CARD
===================================== */

document.addEventListener(
  "mousemove",
  (e) => {

    if (window.innerWidth < 700)
      return;

    const x =
      (e.clientX /
      window.innerWidth) - .5;

    const y =
      (e.clientY /
      window.innerHeight) - .5;

    const rotateX =
      y * -8;

    const rotateY =
      x * 10;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.015)
    `;

  }
);


document.addEventListener(
  "mouseleave",
  () => {

    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  }
);


/* =====================================
   TOUCH EFFECT
===================================== */

card.addEventListener(
  "touchstart",
  () => {

    card.style.transform =
      "scale(.98)";

  }
);

card.addEventListener(
  "touchend",
  () => {

    card.style.transform =
      "scale(1)";

  }
);


/* =====================================
   SAVE CONTACT
===================================== */

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
      "Amr-Samy-Contact.vcf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);


    saveContact.innerHTML =
      "✓ CONTACT SAVED";

    setTimeout(
      () => {

        saveContact.innerHTML =
          "<span>♧</span> SAVE CONTACT";

      },
      2500
    );

  }
);


/* =====================================
   SHARE
===================================== */

shareCard.addEventListener(
  "click",
  async () => {

    const shareData = {

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
          shareData
        );

      } catch (error) {}

    } else {

      try {

        await navigator.clipboard.writeText(
          shareData.url
        );

        shareCard.innerHTML =
          "✓ LINK COPIED";

        setTimeout(
          () => {

            shareCard.innerHTML =
              "<span>↗</span> SHARE";

          },
          2000
        );

      } catch (error) {

        alert(
          shareData.url
        );

      }

    }

  }
);


/* =====================================
   QR CODE
===================================== */

qrButton.addEventListener(
  "click",
  () => {

    qrContainer.classList.toggle(
      "show"
    );


    if (
      qrContainer.classList.contains("show") &&
      qrContainer.children.length === 0
    ) {

      new QRCode(
        qrContainer,
        {

          text:
            "https://iamamrsamy.github.io/amrsamy/",

          width: 150,

          height: 150,

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


/* =====================================
   RANDOM MAGIC SPARKS
===================================== */

function createSpark() {

  const spark =
    document.createElement("div");

  spark.innerHTML =
    Math.random() > .5
      ? "✦"
      : "♦";

  spark.style.position =
    "fixed";

  spark.style.left =
    Math.random() * 100 + "vw";

  spark.style.bottom =
    "-20px";

  spark.style.color =
    "#d4af37";

  spark.style.opacity =
    "0";

  spark.style.fontSize =
    Math.random() * 8 + 7 + "px";

  spark.style.pointerEvents =
    "none";

  spark.style.zIndex =
    "2";


  const duration =
    Math.random() * 5000 + 5000;


  spark.animate(

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
    spark
  );


  setTimeout(
    () => spark.remove(),
    duration
  );

}


setInterval(
  createSpark,
  1400
);