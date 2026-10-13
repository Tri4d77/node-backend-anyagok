// HIBA: a behozott név állandó — a behozó oldal nem írhatja át.
// Csak maga a modul módosíthatja, a saját függvényein keresztül.
import { szamlalo } from "../modulok/allapot.js";
szamlalo = 10;
console.log(szamlalo);
