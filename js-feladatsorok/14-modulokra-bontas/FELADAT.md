# Feladat: bontsd modulokra!

Az `index.js` egy **működő** program: kerületet, területet, felszínt és térfogatot
számol. Minden egyetlen fájlban van benne — konstansok, segédfüggvények, képletek,
egy osztály és maga a program is.

**A dolgod:** szedd szét legalább **négy** modulra úgy, hogy a program
**pontosan ugyanazt** írja ki, mint most.

---

## Indulás

Nézd meg, mit csinál a program, mielőtt hozzányúlnál:

```bash
node index.js
```

Mentsd el a kimenetét — a végén ehhez fogod hasonlítani a sajátodat:

```bash
node index.js > eredeti-kimenet.txt
```

---

## Amit meg kell csinálnod

1. **Csoportosítsd** a kódot: mi tartozik össze? A fájlban hat számozott rész van,
   ez segít — de a döntés a tiéd.
2. **Hozz létre egy-egy fájlt** minden csoportnak.
3. **Írd meg a kiajánlásokat** (`export`) az új fájlokban.
4. **Írd meg a behozatalokat** (`import`) ott, ahol a kód használja őket.
5. Az `index.js`-ben **csak maga a program maradjon** — se konstans, se képlet.
6. **Futtasd le**, és hasonlítsd össze a kimenetet az eredetivel.

---

## Javasolt felosztás

Nem kötelező pontosan így, de ez a kézenfekvő:

| Fájl | Mi kerüljön bele? |
|---|---|
| `konstansok.js` | `TIZEDESEK`, `EGYSEG`, `VONAL` |
| `segedek.js` | `kerekit`, `formaz`, `ellenoriz`, `cimsor` |
| `sikidomok.js` | kör, téglalap, háromszög — kerület és terület |
| `testek.js` | gömb, henger, téglatest — felszín és térfogat |
| `Henger.js` | a `Henger` osztály |
| `index.js` | **csak a program** |

### Melyik modul mit hoz be?

A nyilak azt mutatják, ki kitől függ. Érdemes **alulról felfelé** haladni: előbb a
`konstansok.js`, utoljára az `index.js`.

```
konstansok.js        ← senkit nem hoz be
     ↑
segedek.js           ← konstansok
     ↑
sikidomok.js         ← segedek
     ↑
testek.js            ← segedek + sikidomok
     ↑
Henger.js            ← konstansok + segedek + testek
     ↑
index.js             ← mindet
```

> **Figyeld meg:** a `testek.js` a `sikidomok.js`-t használja — a henger térfogata az
> alapkör területéből jön. Egy modul tehát nemcsak a programnak, hanem **másik
> modulnak** is dolgozhat.

---

## Szabályok, amire figyelj

- Saját fájlnál **kötelező** a `./` előtag **és** a `.js` kiterjesztés:
  `import { formaz } from "./segedek.js";`
- A `package.json`-ben már be van állítva a `"type": "module"` — ezt ne vedd ki.
- Ha egy fájl **egyetlen** dolgot ad (mint a `Henger.js`), ahhoz illik az
  `export default`. A többinél nevesített kiajánlás a jó.
- Csak azt hozd be, amit tényleg használsz. Ha egy modulból öt név kell,
  fontold meg a névtér-behozatalt: `import * as sik from "./sikidomok.js";`

---

## Ellenőrzés

A program akkor jó, ha a kimenet **betűre ugyanaz**, mint az elején elmentett:

```bash
node index.js > uj-kimenet.txt
```

Windowson (PowerShell):

```bash
Compare-Object (Get-Content eredeti-kimenet.txt) (Get-Content uj-kimenet.txt)
```

Ha nem ír ki semmit, nincs eltérés — kész vagy.

A hibás adatokat bemutató rész a végén **szándékosan** hibaüzenetet ír ki.
Az nem a te hibád, annak úgy kell lennie.

---

## Ha elakadsz

| Hibaüzenet | Mi a baj? |
|---|---|
| `Cannot find module …` | Lemaradt a `.js` kiterjesztés, vagy elgépelted a fájlnevet |
| `Cannot find package …` | Lemaradt a `./` előtag — a Node npm-csomagot keres |
| `… does not provide an export named …` | Nem tetted ki az `export`-ot, vagy más a név |
| `… is not defined` | Behozni elfelejtetted azt, amit használsz |
| `Cannot use import statement outside a module` | Hiányzik a `"type": "module"` a package.json-ből |

A részletes magyarázat a mellékelt **`modul-import-export.pdf`** fájlban van,
futtatható példákkal a `pelda/` mappában.

---

## Mintamegoldás

A `megoldas/` mappában megtalálod a kész változatot:

```bash
npm run megoldas
```

**Előbb próbáld meg magadtól** — a megoldásban az a jó, ha már tudod, mit nézel.

---

## Ha gyorsan végeztél

1. Vedd fel a **kúp** térfogatát (`alapkör területe · magasság / 3`) a `testek.js`-be,
   és írasd ki az `index.js`-ben.
2. Csinálj egy `gyujto.js` fájlt, amely újraexportálja a `sikidomok.js` és a
   `testek.js` tartalmát, és az `index.js` már csak ezt az egy modult hozza be.
   (Vigyázz: az `export *` az alapértelmezett kiajánlást **nem** viszi tovább!)
3. Írj egy `Teglatest` osztályt a `Henger` mintájára, külön fájlba.
