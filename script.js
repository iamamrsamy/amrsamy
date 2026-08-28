/* ==========================================
   AMR SAMY
   DIGITAL MAGIC BUSINESS CARD
========================================== */
/* =========================
   SAVE CONTACT
========================= */
const saveContact =
  document.getElementById("saveContact");
saveContact.addEventListener(
  "click",
  function () {
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
      "✓ CONTACT READY";
    setTimeout(
      function () {
        saveContact.innerHTML =
          "<span>＋</span> ADD TO CONTACTS";
      },
      2500
    );
  }
);
/* =========================
   SHARE CARD
========================= */
const shareCard =
  document.getElementById("shareCard");
shareCard.addEventListener(
  "click",
  async function () {
    const shareData = {
      title:
        "Amr Samy — The Magician",
      text:
        "Amr Samy — The Magician ✦",
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
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        await navigator.clipboard.writeText(
          shareData.url
        );
        shareCard.innerHTML =
          "✓ LINK COPIED";
        setTimeout(
          function () {
            shareCard.innerHTML =
              "↗ SHARE CARD";
          },
          2000
        );
      }
      catch (error) {
        prompt(
          "Copy your card link:",
          shareData.url
        );
      }
    }
  }
);
/* =========================
   QR CODE
========================= */
const showQR =
  document.getElementById("showQR");
const qrContainer =
  document.getElementById("qrContainer");
showQR.addEventListener(
  "click",
  function () {
    qrContainer.classList.toggle(
      "show"
    );
    if (
      qrContainer.classList.contains("show")
    ) {
      if (
        qrContainer.innerHTML === ""
      ) {
        new QRCode(
          qrContainer,
          {
            text:
              "https://iamamrsamy.github.io/amrsamy/",
            width: 170,
            height: 170,
            colorDark:
              "#000000",
            colorLight:
              "#ffffff",
            correctLevel:
              QRCode.CorrectLevel.H
          }
        );
      }
      showQR.innerHTML =
        "× HIDE QR";
    }
    else {
      showQR.innerHTML =
        "▦ QR CODE";
    }
  }
);
/* =========================
   CARD TILT
========================= */
const profileCard =
  document.querySelector(
    ".profile-card"
  );
if (
  window.innerWidth > 700
) {
  profileCard.addEventListener(
    "mousemove",
    function (event) {
      const rect =
        profileCard.getBoundingClientRect();
      const x =
        event.clientX -
        rect.left;
      const y =
        event.clientY -
        rect.top;
      const centerX =
        rect.width / 2;
      const centerY =
        rect.height / 2;
      const rotateY =
        (x - centerX) /
        35;
      const rotateX =
        (centerY - y) /
        35;
      profileCard.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-2px)
      `;
    }
  );
  profileCard.addEventListener(
    "mouseleave",
    function () {
      profileCard.style.transform =
        "";
    }
  );
}
/* =========================
   MAGIC SPARKS
========================= */
function createSpark() {
  const spark =
    document.createElement("span");
  const symbols =
    ["✦", "✧", "♦", "♠"];
  spark.innerHTML =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];
  spark.style.position =
    "fixed";
  spark.style.left =
    Math.random() * 100 + "vw";
  spark.style.bottom =
    "-20px";
  spark.style.zIndex =
    "1";
  spark.style.pointerEvents =
    "none";
  spark.style.color =
    Math.random() > .75
      ? "#9b1d2d"
      : "#d7b85a";
  spark.style.fontSize =
    Math.random() * 8 + 6 + "px";
  const animation =
    spark.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translateY(-45vh) rotate(180deg)",
          opacity: .35
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
    spark
  );
  animation.onfinish =
    function () {
      spark.remove();
    };
}
setInterval(
  createSpark,
  1200
);