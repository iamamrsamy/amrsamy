/* =========================================
   AMR SAMY
   MAGICAL WORLD DIGITAL CARD
========================================= */
/* =========================================
   SAVE CONTACT
========================================= */
const saveContact =
  document.getElementById("saveContact");
saveContact.addEventListener(
  "click",
  function () {
    const vCard =
`BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
ORG:Amr Samy The Magician
TITLE:The Magician
TEL;TYPE=CELL:+201115552621
EMAIL:amrsamydxb@gmail.com
URL:https://iamamrsamy.github.io/amrsamy/
NOTE:Magician, Entertainer & Happiness Maker
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
      "✨ SAVED!";
    setTimeout(
      function () {
        saveContact.innerHTML =
          "💾 SAVE CONTACT";
      },
      2200
    );
  }
);
/* =========================================
   SHARE CARD
========================================= */
const shareCard =
  document.getElementById("shareCard");
shareCard.addEventListener(
  "click",
  async function () {
    const shareData = {
      title:
        "Amr Samy — The Magician",
      text:
        "🎩 Welcome to Amr Samy's Magical World ✨",
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
          "✨ LINK COPIED!";
        setTimeout(
          function () {
            shareCard.innerHTML =
              "🚀 SHARE CARD";
          },
          2200
        );
      }
      catch {
        alert(
          shareData.url
        );
      }
    }
  }
);
/* =========================================
   SCROLL REVEAL
========================================= */
const revealElements =
  document.querySelectorAll(
    ".section, .quote-world, .actions"
  );
const observer =
  new IntersectionObserver(
    function(entries) {
      entries.forEach(
        function(entry) {
          if (
            entry.isIntersecting
          ) {
            entry.target.style.opacity =
              "1";
            entry.target.style.transform =
              "translateY(0)";
          }
        }
      );
    },
    {
      threshold: .12
    }
  );
revealElements.forEach(
  function(element) {
    element.style.opacity =
      "0";
    element.style.transform =
      "translateY(35px)";
    element.style.transition =
      "opacity .7s ease, transform .7s ease";
    observer.observe(element);
  }
);
/* =========================================
   MAGIC TOUCH
========================================= */
document.addEventListener(
  "click",
  function(event) {
    createMagicSpark(
      event.clientX,
      event.clientY
    );
  }
);
function createMagicSpark(
  x,
  y
) {
  const spark =
    document.createElement("div");
  spark.innerHTML =
    "✨";
  spark.style.position =
    "fixed";
  spark.style.left =
    x + "px";
  spark.style.top =
    y + "px";
  spark.style.zIndex =
    "9999";
  spark.style.pointerEvents =
    "none";
  spark.style.fontSize =
    "18px";
  const animation =
    spark.animate(
      [
        {
          transform:
            "translate(-50%,-50%) scale(.3) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translate(-50%,-80%) scale(1.4) rotate(25deg)",
          opacity: 1
        },
        {
          transform:
            "translate(-50%,-150%) scale(.7) rotate(80deg)",
          opacity: 0
        }
      ],
      {
        duration: 700,
        easing:
          "ease-out"
      }
    );
  document.body.appendChild(
    spark
  );
  animation.onfinish =
    function() {
      spark.remove();
    };
}
/* =========================================
   FLOATING MAGIC
========================================= */
const magicSymbols = [
  "✨",
  "⭐",
  "✦",
  "♦",
  "♥"
];
function floatingMagic() {
  const element =
    document.createElement("div");
  element.innerText =
    magicSymbols[
      Math.floor(
        Math.random() *
        magicSymbols.length
      )
    ];
  element.style.position =
    "fixed";
  element.style.left =
    Math.random() * 100 + "vw";
  element.style.bottom =
    "-20px";
  element.style.zIndex =
    "1";
  element.style.pointerEvents =
    "none";
  element.style.fontSize =
    (
      Math.random() * 12 + 8
    ) + "px";
  const animation =
    element.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translateY(-50vh) rotate(180deg)",
          opacity: .8
        },
        {
          transform:
            "translateY(-110vh) rotate(360deg)",
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
    element
  );
  animation.onfinish =
    function() {
      element.remove();
    };
}
setInterval(
  floatingMagic,
  850
);
/* =========================================
   MAGIC CARD TILT
========================================= */
const heroCard =
  document.querySelector(".hero-card");
document.addEventListener(
  "mousemove",
  function(event) {
    if (
      window.innerWidth < 700
    ) return;
    const x =
      (window.innerWidth / 2 -
       event.clientX) / 70;
    const y =
      (window.innerHeight / 2 -
       event.clientY) / 70;
    heroCard.style.transform =
      `rotateY(${x}deg) rotateX(${y}deg)`;
  }
);
document.addEventListener(
  "mouseleave",
  function() {
    heroCard.style.transform =
      "";
  }
);