// ===========================================================================
//  7. ÉLŐ KÖTÉS és GYORSÍTÓTÁR — a két legfontosabb, amit félreértenek
//  Futtatás:  node 07-elo-kotes.js
// ===========================================================================

import { szamlalo, novel, nullaz } from "./modulok/allapot.js";

// Ugyanazt a modult másodszor is behozzuk, névtérként.
import * as allapot from "./modulok/allapot.js";

console.log("=== 1. ÉLŐ KÖTÉS ===");
console.log("  Az import NEM másolatot ad, hanem a modul változójára MUTAT.");
console.log("");
console.log("  kezdetben:        szamlalo =", szamlalo);

novel();
console.log("  novel() után:     szamlalo =", szamlalo, " ← magától megváltozott!");

novel();
novel();
console.log("  még kétszer:      szamlalo =", szamlalo);

nullaz();
console.log("  nullaz() után:    szamlalo =", szamlalo);

console.log("");
console.log("=== ⚠ DE: a behozott nevet MI nem írhatjuk át ===");
console.log("  A „szamlalo = 10” sor SyntaxError lenne — a behozott név állandó.");
console.log("  Csak a modul maga módosíthatja, a saját függvényein keresztül.");

console.log("");
console.log("=== 2. A MODUL EGYSZER FUT LE ===");
console.log("  A fenti kettő ugyanaz a modul — ugyanaz a példány:");

novel();
console.log("    szamlalo (nevesített import) =", szamlalo);
console.log("    allapot.szamlalo (névtér)    =", allapot.szamlalo);
console.log("  Nem két külön számláló: a Node a modult EGYSZER tölti be,");
console.log("  és minden további behozatal ugyanazt az egy példányt kapja.");

console.log("");
console.log("=== MIÉRT FONTOS EZ? ===");
console.log("  Erre épül az adatbázis-kapcsolat, a beállítás-objektum és a napló:");
console.log("  egyszer jön létre, és minden fájl ugyanazt használja.");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Írd be: szamlalo = 10;  → SyntaxError (Assignment to constant variable).
//  2) Hívd meg az allapot.novel()-t, és nézd meg a nevesített „szamlalo”-t —
//     az is változik, mert ugyanaz a változó.
// ---------------------------------------------------------------------------
