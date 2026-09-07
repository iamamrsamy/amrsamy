/* ================================================= */
/* شاشة البداية */
/* ================================================= */

window.addEventListener("load", function () {

    const loader =
        document.querySelector(".loading-screen");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 1200);

});



/* ================================================= */
/* القائمة على الموبايل */
/* ================================================= */

const menuButton =
    document.querySelector(".menu-toggle");

const nav =
    document.querySelector(".main-nav");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            nav.classList.toggle("open");

        }
    );

}


document.querySelectorAll(
    ".main-nav a"
).forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            nav.classList.remove("open");

        }
    );

});



/* ================================================= */
/* آراء الجمهور */
/* ================================================= */

const reviews =
    document.querySelectorAll(".review");

const nextReview =
    document.querySelector(".review-next");

const previousReview =
    document.querySelector(".review-prev");

let currentReview = 0;


function showReview(index) {

    reviews.forEach(function (review) {

        review.classList.remove("active");

    });

    reviews[index].classList.add("active");

}


if (nextReview) {

    nextReview.addEventListener(
        "click",
        function () {

            currentReview++;

            if (currentReview >= reviews.length) {

                currentReview = 0;

            }

            showReview(currentReview);

        }
    );

}


if (previousReview) {

    previousReview.addEventListener(
        "click",
        function () {

            currentReview--;

            if (currentReview < 0) {

                currentReview =
                    reviews.length - 1;

            }

            showReview(currentReview);

        }
    );

}


/* تغيير الرأي تلقائياً */

setInterval(function () {

    if (reviews.length > 0) {

        currentReview++;

        if (currentReview >= reviews.length) {

            currentReview = 0;

        }

        showReview(currentReview);

    }

}, 5000);



/* ================================================= */
/* ظهور العناصر أثناء النزول */
/* ================================================= */

const revealElements =
    document.querySelectorAll(
        ".show-card, .why-item, .glass-card, .gallery-item, .number-item"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    function (element) {

        element.classList.add(
            "reveal-element"
        );

        observer.observe(element);

    }
);



/* ================================================= */
/* تأثير حركة الماوس */
/* ================================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        const x =
            (event.clientX /
                window.innerWidth -
                .5);

        const y =
            (event.clientY /
                window.innerHeight -
                .5);


        const cards =
            document.querySelectorAll(
                ".magic-card"
            );


        cards.forEach(
            function (card, index) {

                const strength =
                    (index + 1) * 5;

                card.style.transform =
                    `
                    translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )
                    rotate(
                        ${x * strength}deg
                    )
                    `;

            }
        );

    }
);



/* ================================================= */
/* لمعات تظهر عند الضغط */
/* ================================================= */

document.addEventListener(
    "click",
    function (event) {

        const sparkle =
            document.createElement("div");

        sparkle.innerHTML = "✨";

        sparkle.style.position =
            "fixed";

        sparkle.style.left =
            event.clientX + "px";

        sparkle.style.top =
            event.clientY + "px";

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.zIndex =
            "99999";

        sparkle.style.fontSize =
            "20px";

        sparkle.style.animation =
            "clickSparkle 900ms ease forwards";

        document.body.appendChild(
            sparkle
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            900
        );

    }
);



/* ================================================= */
/* إضافة Animation للضغط */
/* ================================================= */

const clickStyle =
document.createElement("style");


clickStyle.innerHTML = `

@keyframes clickSparkle {

    0% {

        transform:
            translate(-50%,-50%)
            scale(.4)
            rotate(0deg);

        opacity: 1;

    }

    100% {

        transform:
            translate(-50%,-120px)
            scale(1.5)
            rotate(180deg);

        opacity: 0;

    }

}

.reveal-element {

    opacity: 0;

    transform:
        translateY(35px);

    transition:
        opacity .7s ease,
        transform .7s ease;

}

.reveal-element.revealed {

    opacity: 1;

    transform:
        translateY(0);

}

`;


document.head.appendChild(
    clickStyle
);



/* ================================================= */
/* زر الحجز - رسالة واتساب جاهزة */
/* ================================================= */

const whatsappButtons =
document.querySelectorAll(
    ".whatsapp-button"
);


whatsappButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const message =
                    "مرحباً عمرو 👋 أريد الاستفسار عن حجز عرض سحري. ✨";

                const url =
                    "https://wa.me/201115552621?text="
                    +
                    encodeURIComponent(
                        message
                    );

                button.href = url;

            }
        );

    }
);



/* ================================================= */
/* تأثير البارالاكس للـHero */
/* ================================================= */

window.addEventListener(
    "scroll",
    function () {

        const scroll =
            window.scrollY;

        const heroVisual =
            document.querySelector(
                ".hero-visual"
            );


        if (
            heroVisual &&
            scroll < 900
        ) {

            heroVisual.style.transform =
                `translateY(${scroll * .08}px)`;

        }

    }
);