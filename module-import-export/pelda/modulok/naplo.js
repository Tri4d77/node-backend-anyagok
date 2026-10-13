// ===========================================================================
//  naplo.js — CSAK alapértelmezett kiajánlás.
//
//  Akkor használjuk, ha a modul EGYETLEN dolgot ad: egy osztályt,
//  egy objektumot vagy egy függvényt.
// ===========================================================================

// Itt egy objektumot ajánlunk ki. Lehetne névtelen is, de a név segít
// a hibakeresésnél: a veremkiírásban ez a név jelenik meg.
const naplo = {
  info(uzenet) {
    console.log(`  [INFO]  ${uzenet}`);
  },
  hiba(uzenet) {
    console.log(`  [HIBA]  ${uzenet}`);
  },
};

export default naplo;
