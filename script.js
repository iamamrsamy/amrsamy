document.addEventListener("DOMContentLoaded", () => {

    /* تأثير بسيط عند ظهور العناصر */

    const elements = document.querySelectorAll(
        ".magic-door, .magic-scroll, .booking-box, .social-links a"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((element) => {

        element.classList.add("hidden");

        observer.observe(element);

    });


    /* تأثير عصا سحرية عند الضغط */

    document.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            document.body.classList.add("magic-click");

            setTimeout(() => {

                document.body.classList.remove("magic-click");

            }, 500);

        });

    });

});