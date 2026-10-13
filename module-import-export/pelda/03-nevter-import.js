// ===========================================================================
//  3. NÉVTÉR-IMPORT — a TELJES modul egyetlen objektumként
//  Futtatás:  node 03-nevter-import.js
// ===========================================================================

// Az „import * as név” a modul MINDEN nevesített kiajánlását egy objektumba
// gyűjti. Ez a „komplett modul behozatala”.
//
// MIKOR JÓ? Ha a hívásnál látni akarod, honnan jön a függvény:
//   matek.osszead(2, 3)   — azonnal látszik, melyik modulé.
// A tananyagban a vezérlők is így hozzák be a szolgáltatásokat.
import * as matek from "./modulok/matek.js";
import * as szoveg from "./modulok/szoveg.js";

console.log("=== A teljes modul egy objektumként ===");
console.log("  matek.osszead(2, 3) =", matek.osszead(2, 3));
console.log("  matek.PI            =", matek.PI);

console.log("");
console.log("=== Mi van a modulban? ===");

// Az Object.keys megmutatja a modul teljes „felületét”.
console.log("  matek.js kiajánlásai: ", Object.keys(matek).join(", "));
console.log("  szoveg.js kiajánlásai:", Object.keys(szoveg).join(", "));

console.log("");
console.log("=== Az alapértelmezett is benne van — „default” néven ===");
console.log("  matek.default(2) =", matek.default(2).toFixed(4));

console.log("");
console.log("=== A modulobjektum CSAK OLVASHATÓ ===");

// A modulobjektumot nem lehet átírni, bővíteni, se törölni belőle.
// Ez védelem: egy modul nem tudja elrontani a másikat.
try {
  matek.PI = 3;
  console.log("  (ide nem jutunk el)");
} catch (hiba) {
  console.log("  Hozzárendelés:", hiba.constructor.name + " —", hiba.message);
}

console.log("");
console.log("=== Használat a gyakorlatban ===");
const nyers = "   sok    szóköz   van   itt   ";
console.log(`  eredeti:  "${nyers}"`);
console.log(`  tisztit:  "${szoveg.tisztit(nyers)}"`);
console.log(`  rovidit:  "${szoveg.rovidit(szoveg.tisztit(nyers), 10)}"`);

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Írasd ki a typeof matek értékét — „object”, nem „function”.
//  2) Hasonlítsd össze: matek.default === korTerulete (ha behozod külön is).
// ---------------------------------------------------------------------------
