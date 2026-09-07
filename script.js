/* ========================================
   SAVE CONTACT
======================================== */

function saveContact() {

    const contact = `
BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
ORG:Amr Samy The Magician
TEL;TYPE=CELL:01115552621
EMAIL:amrsamydxb@gmail.com
URL:https://instagram.com/iamamrsamy
NOTE:Magician & Performer
END:VCARD
`;

    const blob = new Blob(
        [contact],
        {
            type: "text/vcard;charset=utf-8"
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

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}



/* ========================================
   MAGIC CLICK EFFECT
======================================== */

document.addEventListener(
    "click",
    function (event) {

        const star =
            document.createElement("span");

        star.innerHTML = "✨";

        star.style.position = "fixed";

        star.style.left =
            event.clientX + "px";

        star.style.top =
            event.clientY + "px";

        star.style.pointerEvents =
            "none";

        star.style.zIndex =
            "9999";

        star.style.fontSize =
            "20px";

        document.body.appendChild(star);


        star.animate(

            [
                {
                    transform: "scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        "scale(1.5) translateY(-35px)",
                    opacity: 0
                }
            ],

            {
                duration: 700,

                easing: "ease-out"
            }

        );


        setTimeout(

            () => {
                star.remove();
            },

            700

        );

    }
);