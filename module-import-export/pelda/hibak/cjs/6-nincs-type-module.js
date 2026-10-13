// HIBA: import utasítás, de a package.json-ben nincs "type": "module".
// Ebben a mappában szándékosan "commonjs" áll.
import { osszead } from "../../modulok/matek.js";
console.log(osszead(1, 2));
