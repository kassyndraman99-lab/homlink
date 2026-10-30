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
  { name: "Villa 7 pièces avec piscine", type: "Villa", area: "Riviera Palmeraie", price: 250000,
    amenities: ["Piscine"],
    photos: ["villa7-1.jpg", "villa7-2.jpg", "villa7-3.jpg", "villa7-4.jpg", "villa7-5.jpg", "villa7-6.jpg", "villa7-7.jpg", "villa7-8.jpg"] },

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
  { name: "Studio", type: "Studio", area: "Angré", price: 25000,
    amenities: [],
    photos: ["studio-promo-1.jpg", "studio-promo-2.jpg", "studio-promo-3.jpg", "studio-promo-4.jpg", "studio-promo-5.jpg", "studio-promo-6.jpg", "studio-promo-7.jpg"] },
  { name: "Studio appartement", type: "Studio", area: "Angré", price: 30000,
    amenities: [],
    photos: ["studio-angre-1.jpg", "studio-angre-2.jpg", "studio-angre-3.jpg", "studio-angre-4.jpg", "studio-angre-5.jpg", "studio-angre-6.jpg", "studio-angre-7.jpg"] },
  { name: "Résidence meublée 2 pièces", type: "Appartement", area: "Angré 9e tranche", price: 90000,
    amenities: ["Piscine privée", "Wi-Fi", "Climatisation", "Nettoyage", "Sécurité"] },

  { name: "Logement 2 pièces", type: "Appartement", area: "Yopougon, Anneraie", price: 30000,
    amenities: ["Netflix", "Wi-Fi", "Prime Vidéo", "Climatisation", "Ménage 2 fois par semaine"] },
  { name: "Appartement 2 pièces haut standing", type: "Appartement", area: "Angré, pharmacie Saint Viateur", price: 25000,
    amenities: [],
    photos: ["viateur-1.jpg", "viateur-2.jpg", "viateur-3.jpg", "viateur-4.jpg", "viateur-5.jpg", "viateur-6.jpg", "viateur-7.jpg"] },

  { name: "Résidence meublée 3 pièces", type: "Appartement", area: "Riviera M'Badon, pharmacie Bonne Fortune", price: 55000,
    amenities: ["Haut standing, spacieux", "Bordure de voie principale", "Sécurisée", "Chambres autonomes", "TV, Canal", "Netflix", "Wi-Fi", "Chauffe-eau", "Cuisine équipée", "Parking interne", "Balcon avec barres de sécurité", "Gardien 24h/24"],
    photos: ["mbadon-1.jpg", "mbadon-2.jpg", "mbadon-3.jpg", "mbadon-4.jpg", "mbadon-5.jpg", "mbadon-6.jpg"] },
  { name: "Studio haut standing", type: "Studio", area: "Angré 8e tranche, pharmacie Emanuel", price: 30000,
    amenities: [],
    photos: ["studio-hs-1.jpg", "studio-hs-2.jpg", "studio-hs-3.jpg", "studio-hs-4.jpg", "studio-hs-5.jpg", "studio-hs-6.jpg", "studio-hs-7.jpg"] },
  { name: "Logement", type: "Studio", area: "Angré", price: 25000,
    amenities: ["Wi-Fi", "Netflix", "Chauffe-eau"],
    photos: ["angre-logement-1.jpg", "angre-logement-2.jpg", "angre-logement-3.jpg", "angre-logement-4.jpg", "angre-logement-5.jpg"] },

  { name: "Studio avec jacuzzi", type: "Studio", price: 45000,
    amenities: ["Jacuzzi"],
    photos: ["jacuzzi-1.jpg", "jacuzzi-2.jpg", "jacuzzi-3.jpg", "jacuzzi-4.jpg", "jacuzzi-5.jpg", "jacuzzi-6.jpg", "jacuzzi-7.jpg"] },
  { name: "Appartement 3 pièces", type: "Appartement", price: 60000,
    amenities: [],
    photos: ["appart3-1.jpg", "appart3-2.jpg", "appart3-3.jpg", "appart3-4.jpg", "appart3-5.jpg"] }
];
