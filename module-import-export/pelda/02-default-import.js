// ===========================================================================
//  2. ALAPÉRTELMEZETT (default) IMPORT — kapcsos zárójel NÉLKÜL
//  Futtatás:  node 02-default-import.js
// ===========================================================================

// Az alapértelmezett kiajánlásnak NINCS neve a forrásfájlban — a hívó adja.
// Ezért írhatunk ide bármit; a Node nem ellenőrzi, hogy egyezik-e.
import korTerulete from "./modulok/matek.js";

// Ugyanaz a modul, másik néven behozva — teljesen érvényes.
import akarmilyenNev from "./modulok/matek.js";

// A naplo.js CSAK alapértelmezettet ajánl ki: egy objektumot.
import naplo from "./modulok/naplo.js";

console.log("=== Alapértelmezett import ===");
console.log("  korTerulete(2)  =", korTerulete(2).toFixed(4));
console.log("  akarmilyenNev(2) =", akarmilyenNev(2).toFixed(4), " ← ugyanaz a függvény!");

console.log("");
console.log("=== Objektum alapértelmezett kiajánlásként ===");
naplo.info("Ez a naplo.js alapértelmezett kiajánlása.");
naplo.hiba("Így néz ki egy hibaüzenet.");

console.log("");
console.log("=== A kettő EGYÜTT is behozható ===");

// Ez a leggyakoribb forma: előbb az alapértelmezett, vessző után a nevesítettek.
console.log("  import korTerulete, { osszead, PI } from \"./modulok/matek.js\";");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Hozd be egy sorban mindkettőt a fenti minta szerint, és használd is őket.
//  2) Próbálj a szoveg.js-ből alapértelmezettet behozni — undefined lesz,
//     mert az a modul csak nevesítetteket ad.
// ---------------------------------------------------------------------------
