// ===========================================================================
//  Telefon API — a Postman-tesztek gyakorlásához
//
//  Kész API: csak elindítani és tesztelni kell.
//  Az adatok a memóriában vannak; újraindításkor visszaáll a kezdeti 12 telefon.
//
//  Indítás:  npm install, majd npm run dev
// ===========================================================================

import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const adatok = {
  kovetkezoId: 13,
  telefonok: [
    { id: 1, gyarto: "Apple", modell: "iPhone 13", megjelenes: 2021, kijelzo: 6.1, tarhely: 128, ar: 249990 },
    { id: 2, gyarto: "Apple", modell: "iPhone 14", megjelenes: 2022, kijelzo: 6.1, tarhely: 128, ar: 299990 },
    { id: 3, gyarto: "Apple", modell: "iPhone 15", megjelenes: 2023, kijelzo: 6.1, tarhely: 128, ar: 369990 },
    { id: 4, gyarto: "Samsung", modell: "Galaxy S22", megjelenes: 2022, kijelzo: 6.1, tarhely: 128, ar: 229990 },
    { id: 5, gyarto: "Samsung", modell: "Galaxy S23", megjelenes: 2023, kijelzo: 6.1, tarhely: 256, ar: 309990 },
    { id: 6, gyarto: "Samsung", modell: "Galaxy S24", megjelenes: 2024, kijelzo: 6.2, tarhely: 256, ar: 379990 },
    { id: 7, gyarto: "Google", modell: "Pixel 7", megjelenes: 2022, kijelzo: 6.3, tarhely: 128, ar: 199990 },
    { id: 8, gyarto: "Google", modell: "Pixel 8", megjelenes: 2023, kijelzo: 6.2, tarhely: 128, ar: 279990 },
    { id: 9, gyarto: "Xiaomi", modell: "Redmi Note 12", megjelenes: 2023, kijelzo: 6.67, tarhely: 128, ar: 79990 },
    { id: 10, gyarto: "OnePlus", modell: "OnePlus 11", megjelenes: 2023, kijelzo: 6.7, tarhely: 256, ar: 289990 },
    { id: 11, gyarto: "Motorola", modell: "Edge 40", megjelenes: 2023, kijelzo: 6.55, tarhely: 256, ar: 169990 },
    { id: 12, gyarto: "Nokia", modell: "G22", megjelenes: 2023, kijelzo: 6.52, tarhely: 128, ar: 59990 },
  ],
};

// Egy mező értéke helyes-e. A hiányzó (undefined) mezőt nem nézi.
const SZABALYOK = {
  gyarto: (e) => typeof e === "string" && e.trim() !== "",
  modell: (e) => typeof e === "string" && e.trim() !== "",
  megjelenes: (e) => Number.isInteger(e),
  kijelzo: (e) => typeof e === "number" && e > 0,
  tarhely: (e) => Number.isInteger(e) && e > 0,
  ar: (e) => typeof e === "number" && e > 0,
};
const MEZOK = Object.keys(SZABALYOK);

// Az :id ellenőrzése és a telefon megkeresése; hiba esetén válaszol.
function telefonKeresese(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ hiba: "Az azonosító pozitív egész szám legyen." });
  }
  const telefon = adatok.telefonok.find((t) => t.id === id);
  if (!telefon) {
    return res.status(404).json({ hiba: "Nincs ilyen azonosítójú telefon." });
  }
  req.telefon = telefon;
  next();
}

// GET /api/telefonok — az összes, vagy ?gyarto= szerint szűrve
app.get("/api/telefonok", (req, res) => {
  const { gyarto } = req.query;
  if (gyarto) {
    const keresett = gyarto.toLowerCase();
    return res.json(adatok.telefonok.filter((t) => t.gyarto.toLowerCase() === keresett));
  }
  res.json(adatok.telefonok);
});

// GET /api/telefonok/:id — egy telefon
app.get("/api/telefonok/:id", telefonKeresese, (req, res) => {
  res.json(req.telefon);
});

// POST /api/telefonok — új telefon; mind a hat mező kötelező
app.post("/api/telefonok", (req, res) => {
  const torzs = req.body ?? {};
  const rossz = MEZOK.some((m) => torzs[m] === undefined || !SZABALYOK[m](torzs[m]));
  if (rossz) {
    return res.status(400).json({ hiba: "Hiányzó vagy hibás adat." });
  }

  const uj = { id: adatok.kovetkezoId };
  for (const m of MEZOK) uj[m] = torzs[m];
  adatok.kovetkezoId += 1;
  adatok.telefonok.push(uj);

  res.status(201).location(`/api/telefonok/${uj.id}`).json(uj);
});

// PATCH /api/telefonok/:id — csak a küldött mezők változnak
app.patch("/api/telefonok/:id", telefonKeresese, (req, res) => {
  const torzs = req.body ?? {};
  const rossz = MEZOK.some((m) => torzs[m] !== undefined && !SZABALYOK[m](torzs[m]));
  if (rossz) {
    return res.status(400).json({ hiba: "Hibás adat." });
  }

  for (const m of MEZOK) {
    if (torzs[m] !== undefined) req.telefon[m] = torzs[m];
  }
  res.json(req.telefon);
});

// DELETE /api/telefonok/:id — törlés; 204, törzs nélkül
app.delete("/api/telefonok/:id", telefonKeresese, (req, res) => {
  adatok.telefonok = adatok.telefonok.filter((t) => t.id !== req.telefon.id);
  res.status(204).end();
});

app.listen(PORT, (hiba) => {
  if (hiba) throw hiba;
  console.log(`A Telefon API fut: http://localhost:${PORT}`);
});
