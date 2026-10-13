// ===========================================================================
//  szoveg.js — CSAK nevesített kiajánlások, alapértelmezett nélkül.
//
//  A legtöbb segédmodul ilyen: több, egyenrangú függvényt ad.
// ===========================================================================

/** Nagy kezdőbetűssé alakít. */
export function nagyKezdobetu(szoveg) {
  if (!szoveg) return szoveg;
  return szoveg[0].toUpperCase() + szoveg.slice(1);
}

/** Levágja a felesleges szóközöket, és egyetlen szóközre húzza össze a többszörösöket. */
export function tisztit(szoveg) {
  return szoveg.trim().replace(/\s+/g, " ");
}

/** Megadott hossznál levágja a szöveget, és három pontot tesz a végére. */
export function rovidit(szoveg, hossz = 20) {
  if (szoveg.length <= hossz) return szoveg;
  return szoveg.slice(0, hossz) + "…";
}
