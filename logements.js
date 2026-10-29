/* ===== VOS LOGEMENTS ===== */
/* Pour ajouter un logement : copiez un bloc { ... }, collez-le avant le ] final,
   sans oublier la virgule entre deux blocs.
   Champs : name, type (Studio, Appartement ou Villa), area (facultatif), price (FCFA par nuit),
   amenities (liste), note (facultatif : promo),
   photos (facultatif : liste de photos, la 1re est la principale), exemple :
   photos: ["images/villa-1.jpg", "images/villa-2.jpg", "images/villa-3.jpg"]
   Ne publiez jamais le nom ni le numéro du propriétaire. */

var LOGEMENTS = [
  { name: "Appartement 3 pièces", type: "Appartement", area: "Angré Petro Ivoire", price: 60000,
    amenities: [],
    photos: ["petro-1.jpg", "petro-2.jpg", "petro-3.jpg", "petro-4.jpg", "petro-5.jpg"] },
  { name: "Villa sans piscine", type: "Villa", area: "Riviera 3, Cocody", price: 150000,
    amenities: [] },

  { name: "Très grand studio haut standing", type: "Studio", area: "Angré 8e tranche", price: 30000,
    amenities: ["Moderne", "Wi-Fi", "Climatisation", "Parking", "Sécurité"],
    photos: [
      "Images/WhatsApp Image 2026-10-22 at 02.42.31.jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.32.jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.32 (1).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.33.jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.33 (1).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.33 (2).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.33 (3).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.34.jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.34 (1).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.34 (2).jpeg",
      "Images/WhatsApp Image 2026-10-22 at 02.42.34 (3).jpeg"] },
  { name: "Studio meublé", type: "Studio", area: "Angré, Nouveau CHU Y4", price: 25000,
    amenities: ["Wi-Fi", "TV", "Climatisation", "Cuisine équipée", "Mini-parking"],
    photos: ["chu-y4-1.jpg", "chu-y4-2.jpg", "chu-y4-3.jpg", "chu-y4-4.jpg", "chu-y4-5.jpg", "chu-y4-6.jpg"] },
  { name: "Résidence meublée", type: "Studio", area: "Angré Château", price: 25000,
    amenities: [],
    photos: ["chateau-1.jpg", "chateau-2.jpg", "chateau-3.jpg", "chateau-4.jpg", "chateau-5.jpg", "chateau-6.jpg", "chateau-7.jpg"] },
  { name: "Studio", type: "Studio", area: "Angré", price: 30000,
    amenities: [], note: "Promo : 2 jours pour 45 000 FCFA",
    photos: ["studio-angre-1.jpg", "studio-angre-2.jpg", "studio-angre-3.jpg", "studio-angre-4.jpg", "studio-angre-5.jpg", "studio-angre-6.jpg", "studio-angre-7.jpg"] },
  { name: "Résidence meublée 2 pièces", type: "Appartement", area: "Angré 9e tranche", price: 90000,
    amenities: ["Piscine privée", "Wi-Fi", "Climatisation", "Nettoyage", "Sécurité"] },

  { name: "Logement 2 pièces", type: "Appartement", area: "Yopougon, Anneraie", price: 30000,
    amenities: ["Netflix", "Wi-Fi", "Prime Vidéo", "Climatisation", "Ménage 2 fois par semaine"] },
  { name: "Résidence", type: "Studio", area: "Yopougon, vers la pharmacie Maty", price: 25000,
    amenities: [] },

  { name: "Chambre salon", type: "Appartement", area: "Abatta, carrefour Mefco", price: 30000,
    amenities: [], note: "Promo : 25 000 FCFA jusqu'au 10/11" },
  { name: "Studio", type: "Studio", area: "Faya, pharmacie Ephratta", price: 25000,
    amenities: [] },
  { name: "Logement", type: "Studio", area: "Carrefour Arafat", price: 25000,
    amenities: ["Wi-Fi", "Netflix", "Chauffe-eau"] },

  { name: "Studio avec jacuzzi", type: "Studio", price: 45000,
    amenities: ["Jacuzzi"] },
  { name: "2 chambres salon", type: "Appartement", price: 70000,
    amenities: [] }
];
