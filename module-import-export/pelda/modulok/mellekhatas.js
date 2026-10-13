// ===========================================================================
//  mellekhatas.js — ez a modul SEMMIT nem ajánl ki.
//
//  Mégis van értelme behozni: a benne lévő kód lefut. Ilyenek a valódi
//  világban: polyfill betöltése, globális eseményfigyelő beállítása,
//  bővítmény regisztrálása.
//
//  Behozatal:  import "./modulok/mellekhatas.js";
// ===========================================================================

console.log("  [mellekhatas.js] Ez a sor a modul BEHOZATALAKOR fut le.");

// Példa mellékhatásra: eltesszük az indulás idejét egy globális helyre.
globalThis.indulasIdeje = new Date().toISOString();
