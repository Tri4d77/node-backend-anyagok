// ===========================================================================
//  4. ÁTNEVEZÉS behozatalkor — az „as” kulcsszó
//  Futtatás:  node 04-atnevezes.js
// ===========================================================================

// MIKOR KELL ÁTNEVEZNI?
//   1) névütközés: két modul ugyanazt a nevet ajánlja ki,
//   2) a modul neve túl általános a mi kódunkban,
//   3) foglalt szóval ütközne.
import { osszead as osszeadSzamokat, PI as KOR_PI } from "./modulok/matek.js";

// Névütközés feloldása: mindkét modulban van „rovidit”-szerű művelet.
import { rovidit as szovegetRovidit } from "./modulok/szoveg.js";

console.log("=== Átnevezés behozatalkor ===");
console.log("  osszeadSzamokat(2, 3) =", osszeadSzamokat(2, 3));
console.log("  KOR_PI                =", KOR_PI);
console.log("  szovegetRovidit(…)    =", szovegetRovidit("Nagyon hosszú szöveg itt", 12));

console.log("");
console.log("=== Átnevezés KIAJÁNLÁSKOR ===");

// A matek.js-ben a függvény neve „kerekit”, de „kerekitesTizedesre” néven
// ajánlja ki:  export { kerekit as kerekitesTizedesre };
// Ezért ezen a néven kell behozni — a belső nevet nem is ismerjük.
console.log("  A matek.js belül „kerekit”, kifelé „kerekitesTizedesre”.");

console.log("");
console.log("=== Mindkét oldalon átnevezve ===");
console.log("  A gyujto.js így adja tovább:  export { PI as KOR_PI } from \"./matek.js\";");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Hozd be a „kerekit” nevet — hibát kapsz, mert nem ezen a néven ajánlja ki.
//  2) Hozd be ugyanazt a függvényt kétszer, két néven — működik.
// ---------------------------------------------------------------------------
