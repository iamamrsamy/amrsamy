document.addEventListener("DOMContentLoaded", function () {

    /*
    ========================================
    ✨ إنشاء الشرارات السحرية
    ========================================
    */

    const sparkleContainer =
        document.querySelector(".magic-sparkles");


    for (let i = 0; i < 45; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.classList.add("spark");


        sparkle.style.left =
            Math.random() * 100 + "%";


        sparkle.style.top =
            Math.random() * 100 + "%";


        sparkle.style.animationDelay =
            Math.random() * 3 + "s";


        sparkle.style.animationDuration =
            1.5 +
            Math.random() * 3 +
            "s";


        sparkleContainer.appendChild(sparkle);

    }



    /*
    ========================================
    🎬 Smooth Scroll
    ========================================
    */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        });

});