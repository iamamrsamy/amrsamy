/* =====================================
   AMR SAMY MAGIC
   DIGITAL BUSINESS CARD
===================================== */


/* =====================================
   CREATE MAGICAL PARTICLES
===================================== */

const particleContainer =
    document.getElementById("particles");

const particleCount = 45;

for (let i = 0; i < particleCount; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (7 + Math.random() * 13) + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particle.style.width =
        (1 + Math.random() * 3) + "px";

    particle.style.height =
        particle.style.width;

    particleContainer.appendChild(particle);

}


/* =====================================
   3D CARD MOVEMENT
===================================== */

const card =
    document.getElementById("magicCard");


document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 700) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 35;

    const y =
        (window.innerHeight / 2 - event.clientY) / 35;

    card.style.transform =
        `
        perspective(1200px)
        rotateY(${x}deg)
        rotateX(${y}deg)
        translateZ(5px)
        `;

});


document.addEventListener("mouseleave", () => {

    card.style.transform =
        `
        perspective(1200px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0)
        `;

});


/* =====================================
   MAGIC BUTTON
===================================== */

const magicButton =
    document.getElementById("magicButton");

const flash =
    document.getElementById("magicFlash");


magicButton.addEventListener("click", () => {

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");

    createBurst();

});


/* =====================================
   MAGIC BURST
===================================== */

function createBurst() {

    const rect =
        magicButton.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;


    for (let i = 0; i < 35; i++) {

        const spark =
            document.createElement("div");

        spark.className = "particle";

        spark.style.position = "fixed";

        spark.style.left =
            centerX + "px";

        spark.style.top =
            centerY + "px";

        spark.style.width = "4px";

        spark.style.height = "4px";

        spark.style.animation = "none";

        spark.style.zIndex = "200";

        document.body.appendChild(spark);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            60 + Math.random() * 180;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        spark.animate(

            [
                {
                    transform:
                        "translate(0,0) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,${y}px) scale(0)`,
                    opacity: 0
                }
            ],

            {
                duration:
                    700 + Math.random() * 500,

                easing: "cubic-bezier(.2,.8,.3,1)"
            }

        ).onfinish = () => {

            spark.remove();

        };

    }

}


/* =====================================
   TOUCH EFFECT FOR MOBILE
===================================== */

card.addEventListener("touchstart", () => {

    card.style.boxShadow =
        `
        0 30px 80px rgba(0,0,0,.9),
        0 0 50px rgba(197,154,74,.18)
        `;

});


card.addEventListener("touchend", () => {

    setTimeout(() => {

        card.style.boxShadow =
            `
            0 40px 100px rgba(0,0,0,.85),
            0 0 60px rgba(197,154,74,.08)
            `;

    }, 300);

});


/* =====================================
   RANDOM MAGICAL GLINT
===================================== */

setInterval(() => {

    const glint =
        document.createElement("div");

    glint.className = "particle";

    glint.style.position = "fixed";

    glint.style.left =
        (20 + Math.random() * 60) + "%";

    glint.style.top =
        (20 + Math.random() * 60) + "%";

    glint.style.width = "5px";

    glint.style.height = "5px";

    glint.style.animation =
        "none";

    glint.style.opacity = "0";

    document.body.appendChild(glint);


    glint.animate(

        [
            {
                opacity: 0,
                transform: "scale(0)"
            },

            {
                opacity: 1,
                transform: "scale(1.5)"
            },

            {
                opacity: 0,
                transform: "scale(0)"
            }
        ],

        {
            duration: 900
        }

    ).onfinish = () => {

        glint.remove();

    };

}, 1800);