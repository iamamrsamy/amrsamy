
document.addEventListener("DOMContentLoaded", () => {
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const bookingForm = document.getElementById("bookingForm");
  const currentYear = document.getElementById("currentYear");

  let currentLanguage = "en";

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      const text = element.dataset[language];

      if (text !== undefined) {
        element.innerHTML = text;
      }
    });

    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach((element) => {
      const placeholder =
        language === "ar"
          ? element.dataset.placeholderAr
          : element.dataset.placeholderEn;

      if (placeholder !== undefined) {
        element.placeholder = placeholder;
      }
    });

    if (languageToggle) {
      languageToggle.textContent = language === "en" ? "العربية" : "English";
      languageToggle.setAttribute(
        "aria-label",
        language === "en" ? "Switch to Arabic" : "Switch to English"
      );
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-label",
        language === "en" ? "Open menu" : "افتح القائمة"
      );
    }

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", closeMenu, { once: true });
    });
  }

  function closeMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(currentLanguage === "en" ? "ar" : "en");
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const eventType = document.getElementById("eventType").value;
      const eventDate = document.getElementById("eventDate").value;
      const message = document.getElementById("eventMessage").value.trim();

      if (!name || !eventType) {
        alert(
          currentLanguage === "ar"
            ? "من فضلك اكتب اسمك واختار نوع المناسبة."
            : "Please enter your name and select an event type."
        );
        return;
      }

      const eventLabels = {
        "Kids Magic": currentLanguage === "ar" ? "حفلة أطفال" : "Kids party",
        "Stage Magic": currentLanguage === "ar" ? "عرض مسرحي" : "Stage show",
        "Magic Roaming": currentLanguage === "ar" ? "سحر بين الناس" : "Magic roaming",
        "Corporate Event": currentLanguage === "ar" ? "فعالية شركة" : "Corporate event",
        "Other": currentLanguage === "ar" ? "أخرى" : "Other"
      };

      const details = [
        currentLanguage === "ar" ? "طلب حجز عرض سحري" : "Magic Show Booking Request",
        "",
        `${currentLanguage === "ar" ? "الاسم" : "Name"}: ${name}`,
        `${currentLanguage === "ar" ? "نوع المناسبة" : "Event type"}: ${eventLabels[eventType] || eventType}`,
        eventDate
          ? `${currentLanguage === "ar" ? "التاريخ" : "Date"}: ${eventDate}`
          : "",
        message
          ? `${currentLanguage === "ar" ? "تفاصيل إضافية" : "Additional details"}: ${message}`
          : ""
      ].filter(Boolean);

      const whatsappUrl =
        "https://wa.me/201115552621?text=" +
        encodeURIComponent(details.join("\n"));

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  setLanguage("en");
});
