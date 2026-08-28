/* ===================================
   AMR SAMY DIGITAL BUSINESS CARD
=================================== */


/* =========================
   SAVE CONTACT
========================= */

function saveContact() {

    const contact = `
BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
TITLE:Magician
TEL;TYPE=CELL:01115552621
URL:https://instagram.com/iamamrsamy
URL:https://facebook.com/iamamrsamy
URL:https://www.tiktok.com/@iamamrsamy
URL:https://youtube.com/@iamamrsamy
NOTE:Professional Magician
END:VCARD
`;

    const blob = new Blob(
        [contact],
        {
            type: "text/vcard;charset=utf-8"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Amr-Samy.vcf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =========================
   PAGE LOAD ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".business-card");

    card.style.opacity = "0";

    setTimeout(() => {

        card.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        card.style.opacity = "1";

    }, 100);

});


/* =========================
   SMALL MAGIC EFFECT
========================= */

document.addEventListener("mousemove", (event) => {

    const card = document.querySelector(".business-card");

    if (window.innerWidth < 700) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 60;

    const y =
        (window.innerHeight / 2 - event.clientY) / 60;

    card.style.transform =
        `perspective(1000px)
         rotateY(${x}deg)
         rotateX(${y}deg)`;

});


/* Reset card when mouse leaves */

document.addEventListener("mouseleave", () => {

    const card = document.querySelector(".business-card");

    card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg)";

});