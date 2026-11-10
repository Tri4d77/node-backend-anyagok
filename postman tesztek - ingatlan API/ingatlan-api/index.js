// ===========================================================================
//  Ingatlan API — a Postman-tesztek gyakorlásához
//
//  Kész API: nem kell módosítani, csak elindítani és tesztelni.
//  Az adatok a memóriában vannak; újraindításkor visszaáll a kezdeti 12 ingatlan.
//
//  Indítás:  npm install, majd npm run dev
// ===========================================================================

import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const TIPUSOK = ["lakás", "ház"];

const adatok = {
  kovetkezoId: 13,
  ingatlanok: [
    { id: 1, varos: "Budapest", tipus: "lakás", alapterulet: 54, szobak: 2, ar: 62900000 },
    { id: 2, varos: "Budapest", tipus: "lakás", alapterulet: 38, szobak: 1, ar: 44500000 },
    { id: 3, varos: "Budapest", tipus: "ház", alapterulet: 140, szobak: 5, ar: 159000000 },
    { id: 4, varos: "Debrecen", tipus: "lakás", alapterulet: 61, szobak: 2, ar: 39900000 },
    { id: 5, varos: "Debrecen", tipus: "ház", alapterulet: 110, szobak: 4, ar: 74500000 },
    { id: 6, varos: "Szeged", tipus: "lakás", alapterulet: 47, szobak: 2, ar: 34900000 },
    { id: 7, varos: "Szeged", tipus: "lakás", alapterulet: 72, szobak: 3, ar: 48500000 },
    { id: 8, varos: "Szeged", tipus: "ház", alapterulet: 95, szobak: 3, ar: 64900000 },
    { id: 9, varos: "Pécs", tipus: "lakás", alapterulet: 55, szobak: 2, ar: 32500000 },
    { id: 10, varos: "Győr", tipus: "lakás", alapterulet: 66, szobak: 3, ar: 52900000 },
    { id: 11, varos: "Győr", tipus: "ház", alapterulet: 125, szobak: 4, ar: 89000000 },
    { id: 12, varos: "Miskolc", tipus: "lakás", alapterulet: 50, szobak: 2, ar: 24900000 },
  ],
};

// Az :id ellenőrzése és az ingatlan megkeresése; hiba esetén válaszol.
function ingatlanKeresese(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ hiba: "Az azonosító pozitív egész szám legyen." });
  }
  const ingatlan = adatok.ingatlanok.find((i) => i.id === id);
  if (!ingatlan) {
    return res.status(404).json({ hiba: "Nincs ilyen azonosítójú ingatlan." });
  }
  req.ingatlan = ingatlan;
  next();
}

// GET /api/ingatlanok — az összes, vagy ?varos= szerint szűrve
app.get("/api/ingatlanok", (req, res) => {
  const { varos } = req.query;
  if (varos) {
    const keresett = varos.toLowerCase();
    return res.json(adatok.ingatlanok.filter((i) => i.varos.toLowerCase() === keresett));
  }
  res.json(adatok.ingatlanok);
});

// GET /api/ingatlanok/:id — egy ingatlan
app.get("/api/ingatlanok/:id", ingatlanKeresese, (req, res) => {
  res.json(req.ingatlan);
});

// POST /api/ingatlanok — új ingatlan; 201, Location fejléccel
app.post("/api/ingatlanok", (req, res) => {
  const { varos, tipus, alapterulet, szobak, ar } = req.body ?? {};
  if (
    typeof varos !== "string" ||
    varos.trim() === "" ||
    !TIPUSOK.includes(tipus) ||
    typeof alapterulet !== "number" ||
    alapterulet <= 0 ||
    !Number.isInteger(szobak) ||
    szobak < 1 ||
    typeof ar !== "number" ||
    ar <= 0
  ) {
    return res.status(400).json({ hiba: "Hiányzó vagy hibás adat." });
  }

  const uj = { id: adatok.kovetkezoId, varos, tipus, alapterulet, szobak, ar };
  adatok.kovetkezoId += 1;
  adatok.ingatlanok.push(uj);

  res.status(201).location(`/api/ingatlanok/${uj.id}`).json(uj);
});

// DELETE /api/ingatlanok/:id — törlés; 204, törzs nélkül
app.delete("/api/ingatlanok/:id", ingatlanKeresese, (req, res) => {
  adatok.ingatlanok = adatok.ingatlanok.filter((i) => i.id !== req.ingatlan.id);
  res.status(204).end();
});

app.listen(PORT, (hiba) => {
  if (hiba) throw hiba;
  console.log(`Az Ingatlan API fut: http://localhost:${PORT}`);
});
