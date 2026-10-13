// ===========================================================================
//  8. DINAMIKUS IMPORT — behozatal FUTÁS KÖZBEN
//  Futtatás:  node 08-dinamikus-import.js
// ===========================================================================

// A sima „import” a fájl tetején áll, és a Node még a program indulása ELŐTT
// feldolgozza. Ezért nem lehet feltételhez kötni, és nem lehet a modul neve
// változó.
//
// Az import() FÜGGVÉNYKÉNT viselkedik: bárhol meghívható, Promise-t ad vissza,
// és a neve lehet változó is.

console.log("=== Feltételes behozatal ===");

const kellMatek = process.argv.includes("--matek");

if (kellMatek) {
  const matek = await import("./modulok/matek.js");
  console.log("  A matek.js betöltve:", matek.osszead(2, 3));
} else {
  console.log("  A matek.js BE SEM TÖLTŐDÖTT (nincs --matek kapcsoló).");
  console.log("  Indítsd így:  node 08-dinamikus-import.js --matek");
}

console.log("");
console.log("=== A modul neve lehet VÁLTOZÓ ===");

// Ezt a sima importtal nem lehetne megtenni.
const melyiket = "szoveg";
const modul = await import(`./modulok/${melyiket}.js`);
console.log(`  A(z) "${melyiket}.js" betöltve, kiajánlásai:`, Object.keys(modul).join(", "));
console.log("  nagyKezdobetu('alma') =", modul.nagyKezdobetu("alma"));

console.log("");
console.log("=== Az import() MINDIG névtérobjektumot ad ===");

// Az alapértelmezett kiajánlás a „default” mezőben van — akkor is,
// ha a modulnak csak az van.
const naploModul = await import("./modulok/naplo.js");
naploModul.default.info("Az alapértelmezett a .default mezőben van.");

console.log("");
console.log("=== Hibakezelés: a hiányzó modul elkapható ===");

try {
  await import("./modulok/nincs-ilyen.js");
} catch (hiba) {
  console.log("  Elkapott hiba:", hiba.code);
  console.log("  Ezt a sima importtal NEM lehetne elkapni — ott a program el sem indulna.");
}

console.log("");
console.log("=== MIKOR HASZNÁLJUK? ===");
console.log("  - ritkán kellő, nagy modul (csak ha tényleg kell),");
console.log("  - bővítmények betöltése név alapján,");
console.log("  - feltételtől függő betöltés (pl. fejlesztői eszközök).");
console.log("  Alapesetben MARADJ a sima importnál: az gyorsabb és átláthatóbb.");
