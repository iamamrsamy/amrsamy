
const WHATSAPP_NUMBER = "201115552621";

const translations = {
  en: {
    lang: "en",
    dir: "ltr",
    button: "عربي"
  },
  ar: {
    lang: "ar",
    dir: "rtl",
    button: "English"
  }
};

let currentLang = "en";

const langToggle = document.getElementById("langToggle");
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const bookingForm = document.getElementById("bookingForm");

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = translations[lang].lang;
  document.documentElement.dir = translations[lang].dir;

  langToggle.textContent = translations[lang].button;

  document.querySelectorAll("[data-en][data-ar]").forEach(element => {
    const text = element.dataset[lang];

    if (text !== undefined) {
      element.innerHTML = text;
    }
  });

  document.querySelectorAll(
    "[data-placeholder-en][data-placeholder-ar]"
  ).forEach(element => {
    element.placeholder =
      lang === "ar"
        ? element.dataset.placeholderAr
        : element.dataset.placeholderEn;
  });

  document.title =
    lang === "ar"
      ? "عمرو سامي | الساحر"
      : "Amr Samy | The Magician";

  const description = document.querySelector(
    'meta[name="description"]'
  );

  if (description) {
    description.content =
      lang === "ar"
        ? "عمرو سامي، ساحر محترف يقدم عروض سحر مباشرة وعروض أطفال وفعاليات للشركات والفنادق."
        : "Amr Samy — Professional magician for stage shows, close-up magic, kids, corporate events and hospitality.";
  }
}

langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "ar" : "en");
});

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

function openWhatsApp(message = "") {
  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    (message ? "?text=" + encodeURIComponent(message) : "");

  window.open(url, "_blank", "noopener,noreferrer");
}

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  const data = new FormData(bookingForm);

  const labels = currentLang === "ar"
    ? {
        title: "طلب حجز جديد - عمرو سامي",
        name: "الاسم",
        contact: "بيانات التواصل",
        event: "نوع المناسبة",
        details: "تفاصيل المناسبة"
      }
    : {
        title: "New Booking Request - Amr Samy",
        name: "Name",
        contact: "Contact",
        event: "Event type",
        details: "Event details"
      };

  const message = [
    labels.title,
    "",
    `${labels.name}: ${data.get("name")}`,
    `${labels.contact}: ${data.get("contact")}`,
    `${labels.event}: ${data.get("event")}`,
    `${labels.details}: ${data.get("details") || "-"}`
  ].join("\n");

  openWhatsApp(message);
});

setLanguage("en");
