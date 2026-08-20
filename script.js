/* Replace this with the studio's WhatsApp number in international format.
   Example: 60123456789 — no + symbol, spaces or dashes. */
const WHATSAPP_NUMBER = "601XXXXXXXX";

/* Portfolio content is maintained here. Replace titles, locations, sizes,
   years, categories and image paths when real project information is ready. */
const PROJECTS = [
  {
    number: "01",
    title: "Modern Terrace Residence",
    location: "Kuala Lumpur",
    type: "Residential · Landed",
    size: "2,400 sq ft",
    year: "20XX",
    categories: ["residential", "landed"],
    image: "assets/images/projects/project-01-seri-residence.webp",
    alt: "Warm modern terrace residence living room"
  },
  {
    number: "02",
    title: "Japandi Condominium",
    location: "Mont Kiara",
    type: "Residential · Condo",
    size: "1,650 sq ft",
    year: "20XX",
    categories: ["residential", "condo"],
    image: "assets/images/projects/project-02-japandi-condo.webp",
    alt: "Japandi condominium living and dining interior"
  },
  {
    number: "03",
    title: "Contemporary Kitchen",
    location: "Petaling Jaya",
    type: "Residential · Landed",
    size: "320 sq ft",
    year: "20XX",
    categories: ["residential", "landed"],
    image: "assets/images/projects/project-03-contemporary-kitchen.webp",
    alt: "Contemporary walnut and stone kitchen"
  },
  {
    number: "04",
    title: "Minimalist Bedroom",
    location: "Bangsar South",
    type: "Residential · Condo",
    size: "410 sq ft",
    year: "20XX",
    categories: ["residential", "condo"],
    image: "assets/images/projects/project-04-minimal-bedroom.webp",
    alt: "Minimalist condominium master bedroom"
  },
  {
    number: "05",
    title: "Luxury Bungalow",
    location: "Johor Bahru",
    type: "Residential · Landed",
    size: "6,800 sq ft",
    year: "20XX",
    categories: ["residential", "landed"],
    image: "assets/images/projects/project-05-luxury-bungalow.webp",
    alt: "Double-volume luxury bungalow living room"
  },
  {
    number: "06",
    title: "Commercial Office",
    location: "Petaling Jaya",
    type: "Commercial · Workplace",
    size: "4,200 sq ft",
    year: "20XX",
    categories: ["commercial"],
    image: "assets/images/projects/project-06-commercial-office.webp",
    alt: "Forest green and timber commercial office interior"
  }
];

const projectGrid = document.querySelector("#project-grid");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const toast = document.querySelector("#toast");
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function projectMarkup(project) {
  return `
    <article class="project-card reveal" data-categories="${project.categories.join(" ")}">
      <div class="project-visual">
        <img src="${project.image}" alt="${project.alt}" loading="lazy">
        <span class="project-number" aria-hidden="true">${project.number}</span>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <div class="project-meta">
          <span>${project.location}</span><span>${project.year}</span>
          <span>${project.type}</span><span>${project.size}</span>
        </div>
      </div>
    </article>`;
}

if (projectGrid) projectGrid.innerHTML = PROJECTS.map(projectMarkup).join("");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  mobileNav?.classList.toggle("open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    projectGrid?.classList.toggle("filtered", filter !== "all");
    projectGrid?.querySelectorAll(".project-card").forEach((card) => {
      const categories = card.dataset.categories.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

document.querySelectorAll("[data-comparison]").forEach((comparison) => {
  const range = comparison.querySelector('input[type="range"]');
  function updateComparison() {
    comparison.style.setProperty("--position", `${range.value}%`);
    comparison.style.setProperty("--compare-width", `${comparison.clientWidth}px`);
  }
  range.addEventListener("input", updateComparison);
  window.addEventListener("resize", updateComparison);
  updateComparison();
});

document.querySelectorAll(".service-item > button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".service-item");
    const isOpen = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".service-item.open").forEach((openItem) => {
      if (openItem === item) return;
      openItem.classList.remove("open");
      openItem.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("open", !isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

const revealItems = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .1, rootMargin: "0px 0px -35px" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const pageSections = [...document.querySelectorAll("main section[id]")];
const headerLinks = [...document.querySelectorAll(".desktop-nav a")];
if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      headerLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  pageSections.forEach((section) => navigationObserver.observe(section));
}

function hasWhatsAppNumber() {
  return /^\d{8,15}$/.test(WHATSAPP_NUMBER);
}

function openWhatsApp(message) {
  if (!hasWhatsAppNumber()) {
    navigator.clipboard?.writeText(message).catch(() => {});
    showToast("Demo mode: replace WHATSAPP_NUMBER at the top of script.js. The message was copied.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

document.querySelector("[data-whatsapp]")?.addEventListener("click", () => {
  openWhatsApp("Hi Forma Living, I would like to discuss an interior design or renovation project.");
});

document.querySelectorAll("[data-placeholder-link]").forEach((button) => {
  button.addEventListener("click", () => showToast("Placeholder link — add the studio's confirmed Google Maps or Waze URL before launch."));
});

document.querySelector("#inquiry-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hi Forma Living, I would like to discuss a project.",
    "",
    `Name: ${data.get("name")}`,
    `My WhatsApp: ${data.get("phone")}`,
    `Property location: ${data.get("location")}`,
    `Property type: ${data.get("propertyType")}`,
    `Approximate size: ${data.get("size") || "Not provided"} sq ft`,
    `Condition: ${data.get("condition")}`,
    `Budget placeholder: ${data.get("budget")}`,
    `Expected completion: ${data.get("completion") || "Not provided"}`,
    `Message: ${data.get("message")}`
  ].join("\n");
  openWhatsApp(message);
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
