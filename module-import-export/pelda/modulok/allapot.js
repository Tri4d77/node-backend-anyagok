// ===========================================================================
//  allapot.js — az ÉLŐ KÖTÉS (live binding) bemutatásához.
//
//  A legtöbben azt hiszik, hogy az import MÁSOLATOT hoz létre. Nem:
//  a behozott név a modul VÁLTOZÓJÁRA mutat. Ha a modul megváltoztatja,
//  a behozó oldalon is az új érték látszik.
// ===========================================================================

// Figyelem: „let”, nem „const” — ez a változó menet közben módosulhat.
export let szamlalo = 0;

/** Növeli a számlálót, és visszaadja az új értéket. */
export function novel() {
  szamlalo += 1;
  return szamlalo;
}

/** Nullázza a számlálót. */
export function nullaz() {
  szamlalo = 0;
}
