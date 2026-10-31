/*@cc_on @if (@_jscript)
  WScript.Echo("Ce fichier ne s'ouvre pas en double-clic.\n\nOuvrez plutot le fichier index.html (double-clic) : le site et le catalogue s'afficheront dans votre navigateur.");
  WScript.Quit();
@else @*/

/* ===== Configuration : modifiez ici ===== */
/* Ce fichier est chargé automatiquement par index.html. Ne l'ouvrez pas directement : ouvrez index.html. */
const WHATSAPP_NUMBER = "2250705352793"; // format international, sans + ni espaces

/* Les logements se modifient dans le fichier logements.js */
const LISTINGS = (typeof LOGEMENTS !== "undefined" && LOGEMENTS) || [];

/* Utilitaires */
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const formatPrice = (n) => n.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ");
const escapeHTML = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ===== Menu mobile ===== */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}
menuToggle.addEventListener("click", () => setMenu(!mainNav.classList.contains("open")));
mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ===== Catalogue ===== */
const catalogue = document.getElementById("catalogue");

function renderCatalogue(filter = "all") {
  const items = LISTINGS.filter((l) => filter === "all" || l.type === filter);
  if (!items.length) {
    catalogue.innerHTML = `<p class="center small" style="grid-column:1/-1">Les logements de cette catégorie arrivent bientôt. Écrivez-nous sur WhatsApp pour connaître les disponibilités.</p>`;
    return;
  }
  catalogue.innerHTML = items.map((l) => {
    const pics = (l.photos && l.photos.length ? l.photos : (l.photo ? [l.photo] : []));
    let media = '<span class="no-photo">Photo bientôt disponible</span>';
    if (pics.length) {
      const slides = pics.map((src, i) =>
        `<img src="${escapeHTML(encodeURI(src))}" alt="${escapeHTML(l.name)} - photo ${i + 1}" ${i ? 'loading="lazy"' : ""}>`).join("");
      const nav = pics.length > 1
        ? `<button class="car-btn prev" type="button" aria-label="Photo précédente">‹</button>
           <button class="car-btn next" type="button" aria-label="Photo suivante">›</button>
           <span class="car-count" aria-hidden="true">1 / ${pics.length}</span>`
        : "";
      media = `<div class="carousel" tabindex="0" aria-label="Photos de ${escapeHTML(l.name)}"><div class="car-track">${slides}</div>${nav}</div>`;
    }
    const amenities = (l.amenities || []).map((a) => `<li>${escapeHTML(a)}</li>`).join("");
    return `
      <article class="card listing reveal visible">
        <div class="thumb t-${l.type.toLowerCase()}">
          ${media}
          <span class="type-tag">${escapeHTML(l.type)}</span>
        </div>
        <div class="listing-body">
          <h3>${escapeHTML(l.name)}</h3>
          <p class="where">${l.area ? escapeHTML(l.area) + ", " : ""}Abidjan</p>
          <p class="price"><span>${formatPrice(l.price)}</span> FCFA / nuit</p>
          ${l.note ? `<p class="promo">${escapeHTML(l.note)}</p>` : ""}
          <ul class="amenities">${amenities}</ul>
          <button type="button" class="btn btn-gold btn-reserve" data-idx="${LISTINGS.indexOf(l)}">Réserver sur WhatsApp</button>
        </div>
      </article>`;
  }).join("");
  initCarousels();
}

/* ===== Carrousel photos : défilement intelligent =====
   - défile tout seul, seulement quand la carte est visible à l'écran
   - s'arrête au survol, au toucher, au clavier ; reprend après 8 s sans action
   - ne défile pas si l'onglet est caché ou si l'appareil demande moins d'animations
   - revient à la première photo après la dernière */
const AUTO_DELAY = 3500;
const IDLE_RESUME = 8000;
let carouselTimers = [];
let carouselObserver = null;

function initCarousels() {
  carouselTimers.forEach(clearInterval);
  carouselTimers = [];
  if (carouselObserver) carouselObserver.disconnect();
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const visibleSet = new WeakSet();
  carouselObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => { en.isIntersecting ? visibleSet.add(en.target) : visibleSet.delete(en.target); });
      }, { threshold: 0.6 })
    : null;

  catalogue.querySelectorAll(".carousel").forEach((car) => {
    const track = car.querySelector(".car-track");
    const imgs = track.querySelectorAll("img");
    const count = car.querySelector(".car-count");
    if (!count) return;
    let paused = false;
    let lastUser = 0;

    const current = () => Math.round(track.scrollLeft / track.clientWidth);
    const goTo = (i) => {
      const n = imgs.length;
      const target = (i + n) % n;
      const wrap = Math.abs(target - current()) > 1;
      if (imgs[target]) imgs[target].loading = "eager";
      if (imgs[(target + 1) % n]) imgs[(target + 1) % n].loading = "eager";
      track.scrollTo({ left: target * track.clientWidth, behavior: wrap ? "auto" : "smooth" });
    };
    const go = (dir) => goTo(current() + dir);
    const touched = () => { lastUser = Date.now(); };

    car.querySelector(".prev").addEventListener("click", () => { touched(); go(-1); });
    car.querySelector(".next").addEventListener("click", () => { touched(); go(1); });
    car.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { touched(); go(-1); }
      if (e.key === "ArrowRight") { touched(); go(1); }
    });
    ["pointerdown", "touchstart", "wheel"].forEach((ev) => car.addEventListener(ev, touched, { passive: true }));
    car.addEventListener("mouseenter", () => { paused = true; });
    car.addEventListener("mouseleave", () => { paused = false; touched(); });
    car.addEventListener("focusin", () => { paused = true; });
    car.addEventListener("focusout", () => { paused = false; });
    track.addEventListener("scroll", () => {
      const i = current() + 1;
      count.textContent = `${i} / ${imgs.length}`;
    }, { passive: true });

    if (carouselObserver) carouselObserver.observe(car);
    if (!reduce) {
      const delay = AUTO_DELAY + Math.floor(Math.random() * 900); // les cartes ne changent pas toutes en même temps
      carouselTimers.push(setInterval(() => {
        if (document.hidden || paused) return;
        if (carouselObserver && !visibleSet.has(car)) return;
        if (Date.now() - lastUser < IDLE_RESUME) return;
        go(1);
      }, delay));
    }
  });
}

/* Si une photo ne charge pas, on essaie l'autre emplacement (avec ou sans dossier Images) */
catalogue.addEventListener("error", (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || img.dataset.tried) return;
  img.dataset.tried = "1";
  const raw = decodeURI(img.getAttribute("src"));
  const alt = /^Images\//i.test(raw) ? raw.replace(/^Images\//i, "") : "Images/" + raw;
  img.src = encodeURI(alt);
}, true);

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");
    renderCatalogue(btn.dataset.filter);
  });
});
renderCatalogue();

/* ===== Fenêtre de réservation : questions avant WhatsApp ===== */
const resaModal = document.getElementById("resaModal");
const resaForm = document.getElementById("resaForm");
const resaPers = document.getElementById("resaPers");
const resaIn = document.getElementById("resaIn");
const resaOut = document.getElementById("resaOut");
const resaSummary = document.getElementById("resaSummary");
let resaListing = null;
let resaOpener = null;

const pad2 = (n) => String(n).padStart(2, "0");
const isoToday = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
const isoToUTC = (iso) => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d); };
const utcToIso = (t) => { const d = new Date(t); return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`; };
const frDate = (iso) => iso.split("-").reverse().join("/");
const nightsBetween = (a, b) => Math.round((isoToUTC(b) - isoToUTC(a)) / 86400000);

function resaError(id, msg) {
  const el = document.getElementById(id + "-error");
  const input = document.getElementById(id);
  if (el) el.textContent = msg;
  input.closest(".field").classList.toggle("invalid", Boolean(msg));
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

function updateResaSummary() {
  if (resaIn.value) resaError("resaIn", "");
  if (resaOut.value) resaError("resaOut", "");
  if (resaIn.value) resaOut.min = utcToIso(isoToUTC(resaIn.value) + 86400000);
  if (resaIn.value && resaOut.value && resaOut.value <= resaIn.value) resaOut.value = "";
  if (resaIn.value && resaOut.value) {
    const n = nightsBetween(resaIn.value, resaOut.value);
    const total = resaListing ? n * resaListing.price : 0;
    resaSummary.textContent = `Durée du séjour : ${n} nuit${n > 1 ? "s" : ""}` +
      (resaListing ? ` · estimation ${formatPrice(total)} FCFA (à confirmer par HOMLINK)` : "");
  } else {
    resaSummary.textContent = "Choisissez vos dates pour voir la durée du séjour.";
  }
}

function openResa(listing, opener) {
  resaListing = listing;
  resaOpener = opener || null;
  document.getElementById("resaSub").textContent =
    `${listing.name}${listing.area ? " · " + listing.area : ""} · ${formatPrice(listing.price)} FCFA / nuit`;
  resaForm.reset();
  ["resaPers", "resaIn", "resaOut"].forEach((id) => resaError(id, ""));
  const today = isoToday();
  resaIn.min = today;
  resaOut.min = utcToIso(isoToUTC(today) + 86400000);
  updateResaSummary();
  resaModal.hidden = false;
  document.body.classList.add("modal-open");
  resaPers.focus();
}

function closeResa() {
  resaModal.hidden = true;
  document.body.classList.remove("modal-open");
  if (resaOpener) resaOpener.focus();
}

catalogue.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-reserve");
  if (!btn) return;
  const listing = LISTINGS[Number(btn.dataset.idx)];
  if (listing) openResa(listing, btn);
});
document.getElementById("resaClose").addEventListener("click", closeResa);
resaModal.addEventListener("click", (e) => { if (e.target === resaModal) closeResa(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !resaModal.hidden) closeResa(); });
resaIn.addEventListener("change", updateResaSummary);
resaOut.addEventListener("change", updateResaSummary);
resaPers.addEventListener("change", () => resaError("resaPers", ""));

resaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const today = isoToday();
  const okPers = resaError("resaPers", resaPers.value ? "" : "Indiquez le nombre de personnes.");
  const okIn = resaError("resaIn", !resaIn.value ? "Choisissez la date d'entrée." : (resaIn.value < today ? "La date d'entrée est déjà passée." : ""));
  const okOut = resaError("resaOut", !resaOut.value ? "Choisissez la date de sortie." : (resaIn.value && resaOut.value <= resaIn.value ? "La sortie doit être après l'entrée." : ""));
  if (!(okPers && okIn && okOut)) {
    const first = resaForm.querySelector('[aria-invalid="true"]');
    if (first) first.focus();
    return;
  }
  const l = resaListing;
  const n = nightsBetween(resaIn.value, resaOut.value);
  const lines = [
    "Bonjour HOMLINK, je souhaite réserver :",
    `Logement : ${l.name} (${l.type}${l.area ? ", " + l.area : ""})`,
    `Nombre de personnes : ${resaPers.value}`,
    `Date d'entrée : ${frDate(resaIn.value)}`,
    `Date de sortie : ${frDate(resaOut.value)}`,
    `Durée du séjour : ${n} nuit${n > 1 ? "s" : ""}`,
    `Prix indicatif : ${formatPrice(l.price)} FCFA / nuit (estimation ${formatPrice(n * l.price)} FCFA)`,
    "Pouvez-vous confirmer la disponibilité et le tarif ? Merci."
  ];
  window.open(waLink(lines.join("\n")), "_blank", "noopener");
  closeResa();
});

/* ===== Formulaire propriétaire (validation) ===== */
const form = document.getElementById("partnerForm");
const successMsg = document.getElementById("formSuccess");

function setError(id, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}-error`);
  const field = input.closest(".field");
  if (error) error.textContent = message;
  if (field) field.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function validate() {
  const nom = form.nom.value.trim();
  const tel = form.tel.value.replace(/[\s.\-()]/g, "");
  const email = form.email.value.trim();
  const quartier = form.quartier.value.trim();

  const results = [
    setError("nom", nom.length >= 3 ? "" : "Veuillez saisir votre nom complet."),
    setError("tel", /^(\+?225)?\d{10}$/.test(tel) ? "" : "Numéro invalide (10 chiffres, ex : 0700000000)."),
    setError("email", !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Adresse e-mail invalide."),
    setError("quartier", quartier.length >= 2 ? "" : "Indiquez le quartier du logement."),
    setError("type", form.type.value ? "" : "Choisissez un type de logement."),
    setError("consent", form.consent.checked ? "" : "Votre accord est nécessaire.")
  ];
  return results.every(Boolean);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.hidden = true;

  if (!validate()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const lines = [
    "Bonjour HOMLINK, je souhaite devenir partenaire.",
    `Nom : ${form.nom.value.trim()}`,
    `Téléphone : ${form.tel.value.trim()}`,
    form.email.value.trim() ? `E-mail : ${form.email.value.trim()}` : null,
    `Quartier : ${form.quartier.value.trim()}`,
    `Type de logement : ${form.type.value}`,
    form.message.value.trim() ? `Message : ${form.message.value.trim()}` : null
  ].filter(Boolean);

  window.open(waLink(lines.join("\n")), "_blank", "noopener");
  successMsg.hidden = false;
  form.reset();
});

// Efface l'erreur dès que l'utilisateur corrige un champ
form.querySelectorAll("input, select, textarea").forEach((el) => {
  el.addEventListener("input", () => { if (el.id && document.getElementById(`${el.id}-error`)) setError(el.id, ""); });
});

/* ===== Animations au défilement ===== */
const revealEls = document.querySelectorAll(".reveal:not(.visible)");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ===== Année du pied de page ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/*@end @*/
