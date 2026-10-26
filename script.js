
const WHATSAPP_NUMBER = "201XXXXXXXXX";
// استبدل X برقم واتسابك الحقيقي.
// مثال: 201012345678
// اكتب كود الدولة والرقم فقط، من غير + أو مسافات.

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
const whatsappLink = document.getElementById("whatsappLink");

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = translations[lang].lang;
  document.documentElement.dir = translations[lang].dir;

  langToggle.textContent = translations[lang].button;

  document.querySelectorAll("[data-en][data-ar]").forEach(element => {
    const translatedText = element.dataset[lang];

    if (translatedText !== undefined) {
      element.innerHTML = translatedText;
    }
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach(element => {
    const translatedPlaceholder =
      lang === "ar"
        ? element.dataset.placeholderAr
        : element.dataset.placeholderEn;

    if (translatedPlaceholder !== undefined) {
      element.placeholder = translatedPlaceholder;
    }
  });

  document.title = lang === "ar"
    ? "عمرو سامي | الساحر"
    : "Amr Samy | The Magician";

  document.querySelector('meta[name="description"]').content =
    lang === "ar"
      ? "عمرو سامي، ساحر محترف يقدم عروض سحر مباشرة وعروض أطفال وفعاليات للشركات والفنادق."
      : "Amr Samy — Professional magician creating unforgettable experiences through live magic, close-up performances, stage shows and family entertainment.";
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

document.getElementById("year").textContent = new Date().getFullYear();

function openWhatsApp(message = "") {
  if (WHATSAPP_NUMBER.includes("X")) {
    alert(
      currentLang === "ar"
        ? "من فضلك أضف رقم واتسابك الحقيقي في ملف script.js أولًا."
        : "Please add your real WhatsApp number in script.js first."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    (message ? "?text=" + encodeURIComponent(message) : "");

  window.open(url, "_blank", "noopener,noreferrer");
}

if (whatsappLink) {
  whatsappLink.addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp();
  });
}

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

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
