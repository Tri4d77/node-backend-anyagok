# Modulok: import és export

Részletes leírás és futtatható példák a JavaScript modulrendszeréhez (ESM) Node.js alatt.

| Fájl | Mi ez? |
|---|---|
| [`modul-import-export.pdf`](modul-import-export.pdf) | A leírás — 8 oldal, 15 szakasz |
| `pelda/` | A futtatható példák |

---

## Indulás

Telepíteni nem kell semmit: minden példa a Node beépített eszközeivel fut.

```bash
cd pelda
```

```bash
node 01-nevesitett-import.js
```

Minden fájl önállóan indítható, és a végén **„PRÓBÁLD KI!"** szakasz mondja meg,
mit érdemes elrontani, hogy lásd a következményt.

---

## A példák

| Fájl | Mit mutat meg? |
|---|---|
| `01-nevesitett-import.js` | Nevesített behozatal, válogatás, hiba a modulból |
| `02-default-import.js` | Alapértelmezett behozatal — tetszőleges néven |
| `03-nevter-import.js` | A **teljes modul** objektumként; a modulobjektum nem írható |
| `04-atnevezes.js` | Átnevezés mindkét oldalon (`as`) |
| `05-ujraexport.js` | Gyűjtőmodul; mit **nem** visz tovább az `export *` |
| `06-mellekhatas.js` | Behozatal csak a mellékhatásért; az importok felcsúszása |
| `07-elo-kotes.js` | Élő kötés és a modulok gyorsítótára |
| `08-dinamikus-import.js` | `import()` feltétellel, változó névvel, hibakezeléssel |
| `09-json-import.js` | JSON behozatala a `with { type: "json" }` jelöléssel |
| `10-import-meta.js` | `dirname`, `filename`, `url`, `resolve` — és a `cwd` különbsége |
| `11-gyakori-hibak.js` | A hat hiba **valódi** üzenete, külön folyamatokban futtatva |

A 8. példa kapcsolóval is indítható, hogy lásd a feltételes betöltést:

```bash
node 08-dinamikus-import.js --matek
```

---

## A behozott modulok

A `pelda/modulok/` mappában vannak. Mindegyik mást mutat be:

| Fájl | Mit tanít? |
|---|---|
| `matek.js` | **Teljes modul**: a kiajánlás mind a négy formája egy fájlban |
| `szoveg.js` | Csak nevesített kiajánlások — ilyen a legtöbb segédmodul |
| `naplo.js` | Csak alapértelmezett kiajánlás (egy objektum) |
| `allapot.js` | Az élő kötés bemutatásához (`let` + módosító függvények) |
| `mellekhatas.js` | Semmit nem ajánl ki — mégis van értelme behozni |
| `gyujto.js` | Újraexportálás: több modul egy belépési ponton |
| `beallitasok.json` | JSON-behozatalhoz |

A `pelda/hibak/` mappában **szándékosan hibás** fájlok vannak. Ne javítsd őket:
a 11. példa ezeket futtatja le, hogy a valódi hibaüzeneteket megmutassa.

---

## Mire jó ez?

A hat leggyakoribb modulhiba — mindegyik valódi futtatásból (Node 24.20.0):

| Mit rontottál el? | Mit mond a Node? |
|---|---|
| Lemaradt a `.js` | `ERR_MODULE_NOT_FOUND: Cannot find module …` |
| Lemaradt a `./` | `ERR_MODULE_NOT_FOUND: Cannot find **package** …` |
| Nem létező nevet hozol be | `SyntaxError: … does not provide an export named …` |
| `require()` ESM-ben | `ReferenceError: require is not defined in ES module scope` |
| Átírod a behozott nevet | `TypeError: Assignment to constant variable.` |
| Hiányzik a `"type": "module"` | `SyntaxError: Cannot use import statement outside a module` |

A különbség az első két sor között árulkodó: ha lemarad a `./`, a Node nem fájlt,
hanem **csomagot** keres.
