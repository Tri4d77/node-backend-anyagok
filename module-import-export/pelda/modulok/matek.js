// ===========================================================================
//  matek.js — TELJES modul: nevesített ÉS alapértelmezett kiajánlással.
//
//  Ez a fájl mutatja be mind a három kiajánlási formát:
//    1) nevesített kiajánlás a deklaráció ELŐTT (export function …)
//    2) nevesített kiajánlás UTÓLAG, listával (export { … })
//    3) alapértelmezett kiajánlás (export default …)
// ===========================================================================

// --- 1) Nevesített kiajánlás a deklaráció előtt ---------------------------
// A név, amivel kiajánljuk, ugyanaz, mint a függvény neve.

export function osszead(a, b) {
  return a + b;
}

export function kivon(a, b) {
  return a - b;
}

// Konstans is kiajánlható ugyanígy.
export const PI = 3.14159;

// --- 2) Nevesített kiajánlás utólag, listával -----------------------------
// Előbb megírjuk a függvényeket…

function szoroz(a, b) {
  return a * b;
}

function oszt(a, b) {
  if (b === 0) {
    throw new Error("Nullával nem lehet osztani.");
  }
  return a / b;
}

// …majd egyetlen utasításban felsoroljuk, mit adunk ki.
// Ez a forma akkor kényelmes, ha egy helyen akarod látni a modul „felületét”.
export { szoroz, oszt };

// --- 3) Kiajánlás MÁS NÉVEN ----------------------------------------------
// A belső név maradhat rövid, a kifelé mutatott név lehet beszédesebb.

function kerekit(szam, tizedesek = 2) {
  const szorzo = 10 ** tizedesek;
  return Math.round(szam * szorzo) / szorzo;
}

export { kerekit as kerekitesTizedesre };

// --- 4) Alapértelmezett kiajánlás ----------------------------------------
// Fájlonként LEGFELJEBB EGY lehet. Azt tesszük ide, ami a modul fő dolga.
// A hívó oldalon kapcsos zárójel NÉLKÜL, TETSZŐLEGES néven hozható be.

export default function korTerulete(sugar) {
  return PI * sugar * sugar;
}
