// ===========================================================================
//  5. ÚJRAEXPORTÁLÁS — több modul EGY belépési ponton
//  Futtatás:  node 05-ujraexport.js
// ===========================================================================

// A gyujto.js nem ír saját kódot: összegyűjti a többi modul kiajánlásait.
// A használó így EGYETLEN helyről hoz be mindent — nem kell tudnia, melyik
// függvény melyik fájlban van. A könyvtárak „index.js”-e pontosan ez.
import { osszead, kivon, KOR_PI, tisztit, rovidit, korTerulete, naplo } from "./modulok/gyujto.js";

console.log("=== Minden egy helyről ===");
console.log("  osszead(4, 5)   =", osszead(4, 5));
console.log("  kivon(9, 3)     =", kivon(9, 3));
console.log("  KOR_PI          =", KOR_PI, " ← a matek.js-ben PI a neve");
console.log("  tisztit(…)      =", `"${tisztit("  két    szó  ")}"`);
console.log("  rovidit(…)      =", rovidit("Hosszabb szöveg", 8));
console.log("  korTerulete(2)  =", korTerulete(2).toFixed(4), " ← a matek.js ALAPÉRTELMEZETTJE");
naplo.info("A naplo.js alapértelmezettje is átjött.");

console.log("");
console.log("=== A háromféle újraexportálás ===");
console.log("  export * from \"./szoveg.js\";                  minden nevesített");
console.log("  export { osszead, PI as KOR_PI } from \"…\";    válogatás + átnevezés");
console.log("  export { default as naplo } from \"./naplo.js\"; az alapértelmezett");

console.log("");
console.log("=== ⚠ AMIT AZ „export *” NEM VISZ TOVÁBB ===");
console.log("  Az alapértelmezett kiajánlást NEM. Azért kell a harmadik sor:");
console.log("  enélkül a korTerulete és a naplo nem lenne elérhető a gyűjtőből.");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Vedd ki a gyujto.js-ből az „export { default as naplo }” sort →
//     a fenti naplo.info() hívás elszáll, mert a naplo undefined lesz.
//  2) Nézd meg névtér-importtal, mi minden van a gyűjtőben:
//     import * as minden from "./modulok/gyujto.js";
//     console.log(Object.keys(minden));
// ---------------------------------------------------------------------------
