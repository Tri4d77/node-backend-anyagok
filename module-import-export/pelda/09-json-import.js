// ===========================================================================
//  9. JSON BEHOZATALA — a „with { type: json }” jelöléssel
//  Futtatás:  node 09-json-import.js
// ===========================================================================

// A JSON-fájl behozatalához KÖTELEZŐ megadni a típust. Ez biztonsági
// intézkedés: enélkül egy kiszolgáló becsaphatna úgy, hogy JSON helyett
// futtatható kódot küld.
//
// ⚠ A JSON mindig az ALAPÉRTELMEZETT kiajánlásba kerül — nevesítve nem lehet
// behozni a mezőit.
import beallitasok from "./modulok/beallitasok.json" with { type: "json" };

console.log("=== JSON mint modul ===");
console.log("  alkalmazás:", beallitasok.alkalmazas);
console.log("  verzió:    ", beallitasok.verzio);
console.log("  port:      ", beallitasok.port, `(típusa: ${typeof beallitasok.port})`);
console.log("  funkciók:  ", beallitasok.funkciok.join(", "));

console.log("");
console.log("=== Dinamikusan is megy ===");

const masolat = await import("./modulok/beallitasok.json", { with: { type: "json" } });
console.log("  ugyanaz az objektum:", masolat.default.alkalmazas);

console.log("");
console.log("=== ⚠ MIRE FIGYELJ? ===");
console.log("  - a „with { type: \"json\" }” rész KÖTELEZŐ,");
console.log("  - a JSON csak alapértelmezettként jön: { alkalmazas } nem működne,");
console.log("  - a fájl a program indulásakor egyszer töltődik be, mint minden modul,");
console.log("  - ha a JSON futás közben változhat, ne importáld — olvasd fs-sel.");

// ---------------------------------------------------------------------------
//  PRÓBÁLD KI!
//  1) Vedd ki a „with { type: \"json\" }” részt → ERR_IMPORT_ATTRIBUTE_MISSING.
//  2) Próbáld nevesítve: import { verzio } from "…json" with …  → hibát ad.
// ---------------------------------------------------------------------------
