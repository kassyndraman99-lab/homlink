/* ===== VOS LOGEMENTS ===== */
/* Pour ajouter un logement : copiez un bloc { ... }, collez-le avant le ] final,
   sans oublier la virgule entre deux blocs.
   Champs : name, type (Studio, Appartement ou Villa), area (facultatif), price (FCFA par nuit),
   amenities (liste), note (facultatif : promo), photo (facultatif : "images/nom.jpg").
   Ne publiez jamais le nom ni le numéro du propriétaire. */

var LOGEMENTS = [
  { name: "Villa 5 pièces avec piscine", type: "Villa", area: "Riviera 3, Cocody", price: 200000,
    amenities: ["Piscine", "Wi-Fi", "Sécurité 24h/24", "Garage couvert"] },
  { name: "Villa sans piscine", type: "Villa", area: "Riviera 3, Cocody", price: 150000,
    amenities: [] },

  { name: "Très grand studio haut standing", type: "Studio", area: "Angré 8e tranche", price: 30000,
    amenities: ["Moderne", "Wi-Fi", "Climatisation", "Parking", "Sécurité"] },
  { name: "Studio meublé", type: "Studio", area: "Angré, Nouveau CHU Y4", price: 25000,
    amenities: ["Wi-Fi", "TV", "Climatisation", "Cuisine équipée", "Mini-parking"] },
  { name: "Résidence meublée", type: "Studio", area: "Angré Château", price: 25000,
    amenities: [] },
  { name: "Studio", type: "Studio", area: "Angré", price: 25000,
    amenities: [], note: "Promo : 2 jours pour 45 000 FCFA" },
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
