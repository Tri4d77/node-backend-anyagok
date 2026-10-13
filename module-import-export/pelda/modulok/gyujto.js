// ===========================================================================
//  gyujto.js — ÚJRAEXPORTÁLÁS (re-export).
//
//  Ez a fájl nem ír új kódot: összegyűjti több modul kiajánlásait egy
//  helyre. Így a használó egyetlen helyről hozhat be mindent:
//
//      import { osszead, tisztit } from "./modulok/gyujto.js";
//
//  A nagy könyvtárak „index” fájlja pontosan ezt csinálja.
// ===========================================================================

// 1) MINDEN nevesített kiajánlás továbbadása.
// FIGYELEM: az „export *” az ALAPÉRTELMEZETT kiajánlást NEM viszi tovább!
export * from "./szoveg.js";

// 2) Válogatás: csak néhány név továbbadása, egyiket átnevezve.
export { osszead, kivon, PI as KOR_PI } from "./matek.js";

// 3) Az alapértelmezett kiajánlást kézzel kell továbbadni — itt nevesítetté
//    alakítjuk, mert a gyűjtőnek több forrása van, és csak egy default lehetne.
export { default as korTerulete } from "./matek.js";
export { default as naplo } from "./naplo.js";
