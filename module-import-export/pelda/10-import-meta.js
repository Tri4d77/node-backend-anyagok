// ===========================================================================
//  10. import.meta — hol vagyok, és hol van a másik fájl?
//  Futtatás:  node 10-import-meta.js
// ===========================================================================

import path from "node:path";
import fs from "node:fs/promises";

console.log("=== Hol van ez a fájl? ===");

// A modul mappája. A régi CommonJS-ben ezt __dirname néven hívták —
// ESM-ben az nem létezik. (Node 21.2 óta elérhető.)
console.log("  import.meta.dirname:  ", import.meta.dirname);

// Magának a fájlnak a teljes útvonala (a régi __filename).
console.log("  import.meta.filename: ", import.meta.filename);

// A modul címe URL-ként. Ez a legrégebbi, mindenhol működő forma.
console.log("  import.meta.url:      ", import.meta.url);

console.log("");
console.log("=== ⚠ EZ NEM UGYANAZ: honnan INDÍTOTTAD a programot ===");
console.log("  process.cwd():        ", process.cwd());
console.log("  Ha máshonnan indítod, EZ változik — az import.meta.dirname NEM.");
console.log("  Ezért fájlt MINDIG az import.meta.dirname-ből építve nyiss meg.");

console.log("");
console.log("=== Fájl megnyitása helyesen ===");

// Így akkor is megtalálja, ha egy másik mappából indítottad a programot.
const utvonal = path.join(import.meta.dirname, "modulok", "beallitasok.json");
const tartalom = await fs.readFile(utvonal, "utf8");
console.log("  A beallitasok.json első sora:", tartalom.split("\n")[0]);

console.log("");
console.log("=== import.meta.resolve — hol van egy modul? ===");

// Megmondja, melyik fájlra oldódna fel egy import — anélkül, hogy betöltené.
console.log("  './modulok/matek.js' →");
console.log("   ", import.meta.resolve("./modulok/matek.js"));

console.log("");
console.log("=== Futtatás-e vagy behozatal? ===");

// Hasznos minta: a modul tudja, hogy őt indították-e közvetlenül.
const kozvetlenulInditva = process.argv[1] === import.meta.filename;
console.log("  Közvetlenül indítva:", kozvetlenulInditva);
console.log("  (Ha egy másik fájl hozza be, ez hamis lenne.)");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Lépj ki egy mappával, és indítsd így:  node pelda/10-import-meta.js
//     A process.cwd() megváltozik, az import.meta.dirname NEM.
//  2) Cseréld az útvonalat "modulok/beallitasok.json"-ra (dirname nélkül),
//     és indítsd a másik mappából → ENOENT hibát kapsz.
// ---------------------------------------------------------------------------
