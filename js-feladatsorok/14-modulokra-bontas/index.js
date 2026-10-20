// ===========================================================================
//  GEOMETRIAI SZÁMOLÓ — kerület, terület, felszín, térfogat
//
//  ⚠ EZ A FÁJL SZÁNDÉKOSAN TÚL HOSSZÚ: minden egy helyen van benne.
//  A te feladatod, hogy modulokra bontsd. A részletes leírás: FELADAT.md
//
//  Futtatás:  node index.js
// ===========================================================================

// ===========================================================================
//  1. RÉSZ — KONSTANSOK
//  Olyan értékek, amelyek sosem változnak. Több helyről is használjuk őket.
// ===========================================================================

// Hány tizedesjegyre kerekítsünk a kiíráskor?
const TIZEDESEK = 2;

// A mértékegységek. A program centiméterben számol.
const EGYSEG = {
  hossz: "cm",
  terulet: "cm²",
  terfogat: "cm³",
};

// Egy szép elválasztó vonal a kiíráshoz.
const VONAL = "─".repeat(46);

// ===========================================================================
//  2. RÉSZ — SEGÉDFÜGGVÉNYEK
//  Apró, általános eszközök. Nem geometria: formázás és ellenőrzés.
// ===========================================================================

/**
 * Kerekít a megadott tizedesjegyre.
 * A 10 ** tizedesek azt jelenti: 10 a tizedesek-edik hatványon.
 */
function kerekit(szam, tizedesek = TIZEDESEK) {
  const szorzo = 10 ** tizedesek;
  return Math.round(szam * szorzo) / szorzo;
}

/**
 * Számot és mértékegységet fűz össze olvasható szöveggé.
 * Például:  formaz(78.5398, "cm²")  →  "78.54 cm²"
 */
function formaz(szam, egyseg) {
  return `${kerekit(szam)} ${egyseg}`;
}

/**
 * Megvizsgálja, hogy a kapott érték pozitív szám-e.
 * Ha nem, HIBÁT DOB — így a hibás adat nem terjed tovább a programban.
 */
function ellenoriz(nev, ertek) {
  if (typeof ertek !== "number" || !Number.isFinite(ertek) || ertek <= 0) {
    throw new Error(`A(z) "${nev}" értéke csak pozitív szám lehet. Kapott: ${ertek}`);
  }
  return ertek;
}

/** Címsort ír ki, hogy a kimenet tagolt legyen. */
function cimsor(szoveg) {
  console.log("");
  console.log(szoveg);
  console.log(VONAL);
}

// ===========================================================================
//  3. RÉSZ — SÍKIDOMOK
//  Kerület és terület. Minden függvény ellenőrzi a bemenetét.
// ===========================================================================

/** A kör kerülete:  2 · π · r */
function korKerulete(sugar) {
  ellenoriz("sugár", sugar);
  return 2 * Math.PI * sugar;
}

/** A kör területe:  π · r² */
function korTerulete(sugar) {
  ellenoriz("sugár", sugar);
  return Math.PI * sugar ** 2;
}

/** A téglalap kerülete:  2 · (a + b) */
function teglalapKerulete(a, b) {
  ellenoriz("a oldal", a);
  ellenoriz("b oldal", b);
  return 2 * (a + b);
}

/** A téglalap területe:  a · b */
function teglalapTerulete(a, b) {
  ellenoriz("a oldal", a);
  ellenoriz("b oldal", b);
  return a * b;
}

/** A háromszög területe:  (alap · magasság) / 2 */
function haromszogTerulete(alap, magassag) {
  ellenoriz("alap", alap);
  ellenoriz("magasság", magassag);
  return (alap * magassag) / 2;
}

// ===========================================================================
//  4. RÉSZ — TESTEK
//  Felszín és térfogat.
//
//  FIGYELD MEG: ezek a függvények a SÍKIDOMOKAT használják fel!
//  A henger térfogata = az alapkör területe · magasság.
// ===========================================================================

/** A gömb térfogata:  (4/3) · π · r³ */
function gombTerfogata(sugar) {
  ellenoriz("sugár", sugar);
  return (4 / 3) * Math.PI * sugar ** 3;
}

/** A gömb felszíne:  4 · π · r²  — vagyis négyszer az azonos sugarú kör területe. */
function gombFelszine(sugar) {
  return 4 * korTerulete(sugar);
}

/** A henger térfogata:  alapkör területe · magasság */
function hengerTerfogata(sugar, magassag) {
  ellenoriz("magasság", magassag);
  return korTerulete(sugar) * magassag;
}

/** A henger felszíne:  2 · alapkör + palást (a palást a kerület · magasság) */
function hengerFelszine(sugar, magassag) {
  ellenoriz("magasság", magassag);
  return 2 * korTerulete(sugar) + korKerulete(sugar) * magassag;
}

/** A téglatest térfogata:  a · b · c */
function teglatestTerfogata(a, b, c) {
  ellenoriz("c él", c);
  return teglalapTerulete(a, b) * c;
}

/** A téglatest felszíne:  2 · (ab + ac + bc) */
function teglatestFelszine(a, b, c) {
  ellenoriz("a él", a);
  ellenoriz("b él", b);
  ellenoriz("c él", c);
  return 2 * (a * b + a * c + b * c);
}

// ===========================================================================
//  5. RÉSZ — A HENGER OSZTÁLY
//  Egy osztály, amely összefogja egy henger adatait és műveleteit.
//
//  FIGYELD MEG: ez is a fenti függvényeket hívja — nem számol újra semmit.
// ===========================================================================

class Henger {
  // A # jel privát mezőt jelöl: kívülről nem érhető el.
  #sugar;
  #magassag;

  constructor(sugar, magassag) {
    // Az ellenőrzés már a létrehozáskor megtörténik: hibás hengert
    // létre sem lehet hozni.
    this.#sugar = ellenoriz("sugár", sugar);
    this.#magassag = ellenoriz("magasság", magassag);
  }

  // A getter úgy viselkedik, mint egy tulajdonság: henger.sugar (nem henger.sugar()).
  get sugar() {
    return this.#sugar;
  }

  get magassag() {
    return this.#magassag;
  }

  terfogat() {
    return hengerTerfogata(this.#sugar, this.#magassag);
  }

  felszin() {
    return hengerFelszine(this.#sugar, this.#magassag);
  }

  /** Egysoros, olvasható összefoglaló a hengerről. */
  leiras() {
    const r = formaz(this.#sugar, EGYSEG.hossz);
    const m = formaz(this.#magassag, EGYSEG.hossz);
    return `Henger (r = ${r}, m = ${m})`;
  }
}

// ===========================================================================
//  6. RÉSZ — A PROGRAM
//  Ez használja az összes fentit. Ez marad majd az index.js-ben.
// ===========================================================================

console.log(VONAL);
console.log("  GEOMETRIAI SZÁMOLÓ");
console.log(VONAL);

cimsor("SÍKIDOMOK");

const sugar = 5;
console.log(`  Kör (r = ${formaz(sugar, EGYSEG.hossz)})`);
console.log(`    kerület: ${formaz(korKerulete(sugar), EGYSEG.hossz)}`);
console.log(`    terület: ${formaz(korTerulete(sugar), EGYSEG.terulet)}`);

const a = 4;
const b = 7;
console.log(`  Téglalap (a = ${a}, b = ${b})`);
console.log(`    kerület: ${formaz(teglalapKerulete(a, b), EGYSEG.hossz)}`);
console.log(`    terület: ${formaz(teglalapTerulete(a, b), EGYSEG.terulet)}`);

console.log(`  Háromszög (alap = 6, magasság = 3)`);
console.log(`    terület: ${formaz(haromszogTerulete(6, 3), EGYSEG.terulet)}`);

cimsor("TESTEK");

console.log(`  Gömb (r = ${formaz(sugar, EGYSEG.hossz)})`);
console.log(`    felszín:  ${formaz(gombFelszine(sugar), EGYSEG.terulet)}`);
console.log(`    térfogat: ${formaz(gombTerfogata(sugar), EGYSEG.terfogat)}`);

console.log(`  Téglatest (a = 4, b = 7, c = 2)`);
console.log(`    felszín:  ${formaz(teglatestFelszine(4, 7, 2), EGYSEG.terulet)}`);
console.log(`    térfogat: ${formaz(teglatestTerfogata(4, 7, 2), EGYSEG.terfogat)}`);

cimsor("AZ OSZTÁLY HASZNÁLATA");

const henger = new Henger(3, 10);
console.log(`  ${henger.leiras()}`);
console.log(`    felszín:  ${formaz(henger.felszin(), EGYSEG.terulet)}`);
console.log(`    térfogat: ${formaz(henger.terfogat(), EGYSEG.terfogat)}`);

cimsor("HIBÁS ADAT");

// A try/catch elkapja a hibát, így a program nem áll le.
try {
  new Henger(-2, 10);
} catch (hiba) {
  console.log(`  ${hiba.message}`);
}

try {
  korTerulete("alma");
} catch (hiba) {
  console.log(`  ${hiba.message}`);
}

console.log("");
console.log(VONAL);
console.log("  Kész. Most bontsd modulokra — lásd a FELADAT.md fájlt!");
console.log(VONAL);
