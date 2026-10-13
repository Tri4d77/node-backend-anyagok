// ===========================================================================
//  1. NEVESÍTETT IMPORT — kapcsos zárójellel
//  Futtatás:  node 01-nevesitett-import.js
// ===========================================================================

// A kapcsos zárójelben PONTOSAN azokat a neveket soroljuk fel, amelyeket
// a másik fájl kiajánlott. A sorrend nem számít, de a név igen.
//
// ⚠ KÉT KÖTELEZŐ SZABÁLY saját fájlnál:
//    - a "./" előtag (különben npm-csomagot keresne),
//    - a ".js" kiterjesztés (a frontendes eszközöknél elhagyható, Node-ban NEM).
import { osszead, kivon, szoroz, oszt, PI } from "./modulok/matek.js";

console.log("=== Nevesített import ===");
console.log("  osszead(2, 3) =", osszead(2, 3));
console.log("  kivon(10, 4)  =", kivon(10, 4));
console.log("  szoroz(3, 7)  =", szoroz(3, 7));
console.log("  oszt(10, 4)   =", oszt(10, 4));
console.log("  PI            =", PI);

console.log("");
console.log("=== Csak azt hozzuk be, amire szükség van ===");

// Nem kötelező mindent behozni. Ez a szokásos: a modul tíz dolgot ad,
// nekünk kettő kell.
console.log("  A fenti sorban öt nevet hoztunk be, pedig a matek.js hatot ad.");

console.log("");
console.log("=== A modulból dobott hiba is átjön ===");

try {
  oszt(10, 0);
} catch (hiba) {
  console.log("  Elkapott hiba:", hiba.message);
}

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Vedd ki a ".js" kiterjesztést az importból → ERR_MODULE_NOT_FOUND.
//  2) Hozz be egy nem létező nevet (pl. gyokvon) → SyntaxError, MÉG INDULÁS ELŐTT.
//  3) Írd át a "./"-t "modulok/matek.js"-re → a Node npm-csomagként keresné.
// ---------------------------------------------------------------------------
