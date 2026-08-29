/* =========================================
   AMR SAMY
   KIDS MAGIC DIGITAL CARD
========================================= */
/* =========================================
   MAGIC REVEAL
========================================= */
const magicButton =
  document.getElementById("magicButton");
const content =
  document.getElementById("content");
magicButton.addEventListener(
  "click",
  function () {
    /* Button transformation */
    magicButton.innerHTML =
      "✨ MAGIC UNLOCKED! ✨";
    /* Reveal */
    content.classList.add("active");
    /* Confetti */
    createConfettiBurst();
    /* Scroll */
    setTimeout(
      function () {
        content.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      },
      400
    );
  }
);
/* =========================================
   CONFETTI
========================================= */
function createConfettiBurst() {
  const pieces = [
    "⭐",
    "✨",
    "🎉",
    "🎈",
    "♦",
    "♠",
    "♥",
    "♣",
    "🌟"
  ];
  for (
    let i = 0;
    i < 35;
    i++
  ) {
    const piece =
      document.createElement("div");
    piece.innerText =
      pieces[
        Math.floor(
          Math.random() *
          pieces.length
        )
      ];
    piece.style.position =
      "fixed";
    piece.style.left =
      "50%";
    piece.style.top =
      "45%";
    piece.style.zIndex =
      "999";
    piece.style.pointerEvents =
      "none";
    piece.style.fontSize =
      (
        Math.random() * 12 + 10
      ) + "px";
    const angle =
      Math.random() *
      Math.PI *
      2;
    const distance =
      Math.random() *
      260 + 80;
    const x =
      Math.cos(angle) *
      distance;
    const y =
      Math.sin(angle) *
      distance;
    const animation =
      piece.animate(
        [
          {
            transform:
              "translate(-50%, -50%) scale(.3) rotate(0deg)",
            opacity: 1
          },
          {
            transform:
              `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(360deg)`,
            opacity: 0
          }
        ],
        {
          duration:
            Math.random() *
            900 + 900,
          easing:
            "cubic-bezier(.2,.8,.3,1)"
        }
      );
    document.body.appendChild(
      piece
    );
    animation.onfinish =
      function () {
        piece.remove();
      };
  }
}
/* =========================================
   SAVE CONTACT
========================================= */
const saveContact =
  document.getElementById(
    "saveContact"
  );
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
    document.body.appendChild(
      link
    );
    link.click();
    link.remove();
    URL.revokeObjectURL(
      url
    );
    saveContact.innerHTML =
      "🎉 CONTACT SAVED!";
    setTimeout(
      function () {
        saveContact.innerHTML =
          "💾 SAVE CONTACT";
      },
      2500
    );
  }
);
/* =========================================
   SHARE
========================================= */
const shareCard =
  document.getElementById(
    "shareCard"
  );
shareCard.addEventListener(
  "click",
  async function () {
    const shareData = {
      title:
        "Amr Samy — The Magician",
      text:
        "🎩 Meet Amr Samy — The Magician ✨",
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
          "🎉 LINK COPIED!";
        setTimeout(
          function () {
            shareCard.innerHTML =
              "🚀 SHARE CARD";
          },
          2000
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
   RANDOM MAGIC SPARKLES
========================================= */
function createSparkle() {
  const sparkle =
    document.createElement(
      "div"
    );
  const symbols = [
    "✨",
    "⭐",
    "✦",
    "🎈"
  ];
  sparkle.innerText =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];
  sparkle.style.position =
    "fixed";
  sparkle.style.left =
    Math.random() * 100 + "vw";
  sparkle.style.bottom =
    "-20px";
  sparkle.style.zIndex =
    "1";
  sparkle.style.pointerEvents =
    "none";
  sparkle.style.fontSize =
    (
      Math.random() * 8 + 7
    ) + "px";
  const animation =
    sparkle.animate(
      [
        {
          transform:
            "translateY(0) rotate(0deg)",
          opacity: 0
        },
        {
          transform:
            "translateY(-50vh) rotate(180deg)",
          opacity: 1
        },
        {
          transform:
            "translateY(-105vh) rotate(360deg)",
          opacity: 0
        }
      ],
      {
        duration:
          Math.random() *
          5000 + 5000,
        easing:
          "linear"
      }
    );
  document.body.appendChild(
    sparkle
  );
  animation.onfinish =
    function () {
      sparkle.remove();
    };
}
setInterval(
  createSparkle,
  900
);
/* =========================================
   TOUCH MAGIC
========================================= */
document.addEventListener(
  "touchstart",
  function (event) {
    const touch =
      event.touches[0];
    createTouchSpark(
      touch.clientX,
      touch.clientY
    );
  }
);
function createTouchSpark(
  x,
  y
) {
  const spark =
    document.createElement(
      "div"
    );
  spark.innerText =
    "✨";
  spark.style.position =
    "fixed";
  spark.style.left =
    x + "px";
  spark.style.top =
    y + "px";
  spark.style.zIndex =
    "999";
  spark.style.pointerEvents =
    "none";
  spark.style.fontSize =
    "18px";
  const animation =
    spark.animate(
      [
        {
          transform:
            "scale(.4)",
          opacity: 0
        },
        {
          transform:
            "scale(1.5) translateY(-20px)",
          opacity: 1
        },
        {
          transform:
            "scale(.8) translateY(-45px)",
          opacity: 0
        }
      ],
      {
        duration:
          700
      }
    );
  document.body.appendChild(
    spark
  );
  animation.onfinish =
    () => spark.remove();
}