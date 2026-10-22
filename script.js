/*@cc_on @if (@_jscript)
  WScript.Echo("Ce fichier ne s'ouvre pas en double-clic.\n\nOuvrez plutot le fichier index.html (double-clic) : le site et le catalogue s'afficheront dans votre navigateur.");
  WScript.Quit();
@else @*/

/* ===== Configuration : modifiez ici ===== */
/* Ce fichier est chargé automatiquement par index.html. Ne l'ouvrez pas directement : ouvrez index.html. */
const WHATSAPP_NUMBER = "2250705352793"; // format international, sans + ni espaces

/* Les logements se modifient dans le fichier logements.js */
const LISTINGS = (typeof LOGEMENTS !== "undefined" && LOGEMENTS) || [];

const ICON_HOUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>';

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
    const msg = `Bonjour HOMLINK, je souhaite réserver ou avoir des informations sur : ${l.name} (${l.type}${l.area ? ", " + l.area : ""}).`;
    const media = l.photo
      ? `<img src="${escapeHTML(l.photo)}" alt="${escapeHTML(l.name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
      : ICON_HOUSE;
    const amenities = (l.amenities || []).map((a) => `<li>${escapeHTML(a)}</li>`).join("");
    return `
      <article class="card listing reveal visible">
        <div class="thumb t-${l.type.toLowerCase()}">
          ${media}
          <span class="type-tag">${escapeHTML(l.type)}</span>
        </div>
        <div class="listing-body">
          <h3>${escapeHTML(l.name)}</h3>
          <p class="where">📍 ${l.area ? escapeHTML(l.area) + ", " : ""}Abidjan</p>
          <p class="price"><span>${formatPrice(l.price)}</span> FCFA / nuit</p>
          ${l.note ? `<p class="promo">${escapeHTML(l.note)}</p>` : ""}
          <ul class="amenities">${amenities}</ul>
          <a class="btn btn-gold" href="${waLink(msg)}" target="_blank" rel="noopener">Réserver sur WhatsApp</a>
        </div>
      </article>`;
  }).join("");
}

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
