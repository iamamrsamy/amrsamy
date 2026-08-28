/* =========================================
   MAGICAL CARD INTERACTIONS
========================================= */


/* -----------------------------------------
   SAVE CONTACT
----------------------------------------- */

const saveContact = document.getElementById("saveContact");
const toast = document.getElementById("toast");


saveContact.addEventListener("click", async () => {

    const contact = {

        name: "Amr Samy",

        phone: "+201115552621",

        email: "amrsamydxb@gmail.com"

    };


    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
TITLE:Magician
END:VCARD
`;


    try {

        const blob = new Blob(
            [vCard],
            {
                type: "text/vcard"
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


        showToast();

    } catch (error) {

        console.error(error);

    }

});


function showToast() {

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}



/* -----------------------------------------
   MAGICAL MOUSE GLOW
----------------------------------------- */

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;
    const y = event.clientY;


    document.documentElement.style.setProperty(
        "--mouse-x",
        `${x}px`
    );


    document.documentElement.style.setProperty(
        "--mouse-y",
        `${y}px`
    );

});



/* -----------------------------------------
   LITTLE CARD TILT EFFECT
----------------------------------------- */

const socialCards =
    document.querySelectorAll(".social-card");


socialCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -2;


        const rotateY =
            ((x - centerX) / centerX) * 2;


        card.style.transform =
            `perspective(500px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



/* -----------------------------------------
   RANDOM MAGICAL SPARKLES
----------------------------------------- */

function createSparkle() {

    const sparkle =
        document.createElement("div");


    sparkle.innerHTML = "✦";


    sparkle.style.position = "fixed";

    sparkle.style.left =
        Math.random() * 100 + "%";

    sparkle.style.top =
        Math.random() * 100 + "%";


    sparkle.style.color =
        "#d8b56a";


    sparkle.style.fontSize =
        Math.random() * 8 + 5 + "px";


    sparkle.style.pointerEvents =
        "none";


    sparkle.style.zIndex =
        "-1";


    sparkle.style.opacity =
        "0";


    sparkle.style.transition =
        "all 2s ease";


    document.body.appendChild(sparkle);


    requestAnimationFrame(() => {

        sparkle.style.opacity =
            Math.random() * .5 + .2;

        sparkle.style.transform =
            "translateY(-30px) scale(1.5)";

    });


    setTimeout(() => {

        sparkle.style.opacity = "0";

        setTimeout(() => {

            sparkle.remove();

        }, 500);

    }, 1800);

}


setInterval(createSparkle, 700);