// ===========================================================================
//  11. A HAT LEGGYAKORIBB MODULHIBA — VALÓDI hibaüzenetekkel
//  Futtatás:  node 11-gyakori-hibak.js
//
//  A modulhibák többsége a program INDULÁSA ELŐTT csap le, ezért try/catch-csel
//  nem lehet őket elkapni. Hogy mégis lásd a valódi üzenetet, ez a program
//  minden hibás fájlt KÜLÖN FOLYAMATBAN indít el, és kiírja, mit mondott a Node.
//
//  A hibás fájlok a hibak/ mappában vannak — nyisd meg őket is!
// ===========================================================================

import { spawnSync } from "node:child_process";
import path from "node:path";

const esetek = [
  { fajl: "hibak/1-nincs-kiterjesztes.js", cim: "Lemaradt a .js kiterjesztés" },
  { fajl: "hibak/2-nincs-pont-per.js", cim: "Lemaradt a ./ előtag" },
  { fajl: "hibak/3-nincs-ilyen-nev.js", cim: "Nem létező nevet hozunk be" },
  { fajl: "hibak/4-require-esm-ben.js", cim: "require() ESM-ben" },
  { fajl: "hibak/5-import-atirasa.js", cim: "A behozott név átírása" },
  { fajl: "hibak/cjs/6-nincs-type-module.js", cim: 'Hiányzik a "type": "module"' },
];

console.log("=== A hat leggyakoribb modulhiba ===");

for (const [sorszam, eset] of esetek.entries()) {
  const teljes = path.join(import.meta.dirname, eset.fajl);

  // A spawnSync elindítja a Node-ot, megvárja, és visszaadja a kimenetét.
  const eredmeny = spawnSync(process.execPath, [teljes], { encoding: "utf8" });

  // A hibaüzenet a szabványos hibakimeneten (stderr) jön.
  const sorok = (eredmeny.stderr || "").split("\n").map((s) => s.trim());

  // A Node a hibakódot külön sorban írja ki, „code: ...” alakban.
  const kodSor = sorok.find((s) => s.startsWith("code:"));
  const kod = kodSor ? kodSor.replace("code:", "").replace(/[',]/g, "").trim() : "";

  // Az első érdemi üzenetsor.
  const uzenet =
    sorok.find((s) => /^(SyntaxError|ReferenceError|TypeError|Error|CustomError)/.test(s)) ||
    sorok.find((s) => s.includes("Cannot find")) ||
    "(nem sikerült kiolvasni)";

  console.log("");
  console.log(`  ${sorszam + 1}. ${eset.cim}`);
  console.log(`     fájl:  ${eset.fajl}`);
  console.log(`     kód:   ${kod || "(ehhez a hibához nem tartozik kód)"}`);
  console.log(`     hiba:  ${uzenet.slice(0, 110)}`);
}

console.log("");
console.log("=== A JAVÍTÁS mindegyikre ===");
console.log('  1. Írd ki a kiterjesztést:  from "../modulok/matek.js"');
console.log('  2. Saját fájlnál kell a ./ vagy ../ — npm-csomagnál CSAK a név');
console.log("  3. Nézd meg, mit ajánl ki a modul (import * as m, majd Object.keys(m))");
console.log("  4. ESM-ben import van, nem require — vagy használd az import()-ot");
console.log("  5. A behozott nevet nem írhatod át; kérd meg a modult egy függvénnyel");
console.log('  6. Vedd fel a package.json-be:  "type": "module"');
