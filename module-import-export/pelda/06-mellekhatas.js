// ===========================================================================
//  6. BEHOZATAL CSAK A MELLÉKHATÁSÉRT — nincs kapcsos zárójel, nincs név
//  Futtatás:  node 06-mellekhatas.js
// ===========================================================================

console.log("=== A behozatal ELŐTT ===");
console.log("  globalThis.indulasIdeje =", globalThis.indulasIdeje);

// Ez a forma semmit nem hoz be — csak LEFUTTATJA a modult.
// A valódi világban: polyfill betöltése, eseményfigyelő beállítása,
// bővítmény regisztrálása.
import "./modulok/mellekhatas.js";

console.log("");
console.log("=== A behozatal UTÁN ===");
console.log("  globalThis.indulasIdeje =", globalThis.indulasIdeje);

console.log("");
console.log("=== ⚠ FIGYELEM: az importok FELCSÚSZNAK ===");
console.log("  A fenti „ELŐTT” felirat UTÁN áll az import a fájlban —");
console.log("  a modul kimenete mégis a legelső sor volt. Az importokat a Node");
console.log("  a fájl minden más utasítása ELŐTT feldolgozza (hoisting).");
console.log("  Ezért lett az „indulasIdeje” már az első kiírásnál is kitöltve.");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Tedd az importot a fájl legtetejére — a kimenet UGYANAZ marad.
//  2) Hozd be a modult kétszer: a [mellekhatas.js] sor csak EGYSZER jelenik meg
//     (lásd a 7. példát: a modul egyszer fut le, az eredménye gyorsítótárazott).
// ---------------------------------------------------------------------------
