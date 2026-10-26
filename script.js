
(() => {
  "use strict";

  const WHATSAPP_NUMBER = "201115552621";

  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const bookingForm = document.getElementById("bookingForm");

  let currentLanguage = "en";

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      currentLanguage === "ar" ? "فتح القائمة" : "Open menu"
    );
  }

  function setLanguage(language) {
    currentLanguage = language;

    const isArabic = language === "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.dir = isArabic ? "rtl" : "ltr";

    document.title = isArabic
      ? "عمرو سامي | لاعب الخفة"
      : "Amr Samy | The Magician";

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.content = isArabic
        ? "عمرو سامي، لاعب خفة محترف يقدم عروض سحر تفاعلية للأطفال والعائلات والشركات والفنادق."
        : "Amr Samy — Professional Magician, The Happiness Maker. Live magic shows, close-up magic and unforgettable events.";
    }

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      const translation = element.dataset[language];

      if (translation !== undefined) {
        element.innerHTML = translation;
      }
    });

    const name = document.getElementById("name");
    const location = document.getElementById("location");
    const details = document.getElementById("details");

    if (name) {
      name.placeholder = isArabic
        ? "مثال: سارة أحمد"
        : "e.g. Sarah Ahmed";
    }

    if (location) {
      location.placeholder = isArabic
        ? "القاهرة، مصر"
        : "Cairo, Egypt";
    }

    if (details) {
      details.placeholder = isArabic
        ? "احكيلي شوية عن مناسبتك..."
        : "Tell me a little about your event...";
    }

    if (languageToggle) {
      languageToggle.textContent = isArabic ? "English" : "عربي";
    }

    closeMenu();
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(currentLanguage === "en" ? "ar" : "en");
    });
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? (currentLanguage === "ar" ? "إغلاق القائمة" : "Close menu")
          : (currentLanguage === "ar" ? "فتح القائمة" : "Open menu")
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!bookingForm.reportValidity()) return;

      const data = new FormData(bookingForm);
      const isArabic = currentLanguage === "ar";

      const name = String(data.get("name") || "").trim();
      const eventType = String(data.get("eventType") || "").trim();
      const date = String(data.get("date") || "").trim();
      const location = String(data.get("location") || "").trim();
      const details = String(data.get("details") || "").trim();

      const message = isArabic
        ? `أهلًا عمرو، حابب أستفسر عن حجز عرض.\nالاسم: ${name}\nنوع المناسبة: ${eventType}${date ? `\nالتاريخ: ${date}` : ""}${location ? `\nالمدينة / المكان: ${location}` : ""}${details ? `\nتفاصيل إضافية: ${details}` : ""}`
        : `Hi Amr, I'd like to enquire about booking a show.\nName: ${name}\nEvent type: ${eventType}${date ? `\nEvent date: ${date}` : ""}${location ? `\nCity / venue: ${location}` : ""}${details ? `\nAdditional details: ${details}` : ""}`;

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  setLanguage("en");
})();
