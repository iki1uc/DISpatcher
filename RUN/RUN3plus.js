// ───────────────────────────────────────────────
// RUN 3+  ·  MASTER PIPELINE
// verbindet alle neuen Engines in einem Lauf
// ───────────────────────────────────────────────

import BEWEGUNG from "./bewegung.ready";
import DESA from "./desamalatzion.ready";
import ASYM from "./asymilation.ready";

import CYLINDER from "../raw/cylinder.pump";
import AXIOMPUMP from "../ROM/axiom.pump.origin";

export async function RUN3PLUS(input = {}) {

    // 1) Bewegung erzeugen
    const beweg = BEWEGUNG.set(input).compute();

    // 2) Mechanische Loops pumpen
    const mech = CYLINDER
        .set({ axis: beweg.axis ?? 81 })
        .pump(3); // 3 Loops für RUN3+

    // 3) Axiom-Pumpe aktivieren
    const axiom = AXIOMPUMP
        .set({ axiom: beweg.axiom ?? "e" })
        .compute();

    // 4) Raumzerstörung (Worldbrecher)
    const desa = DESA
        .set({
            raum: input.raum ?? "default",
            axiom: beweg.axiom,
            axis: beweg.axis
        })
        .compute();

    // 5) Asymilation (Dispatcher)
    const asym = ASYM
        .set({
            raum: desa.raum_neu,
            axiom: axiom.axiom,
            axis: beweg.axis,
            hdf: axiom.hdf
        })
        .compute();

    // 6) Ergebnis zusammenbauen
    return {
        RUN: "RUN3+",
        bewegung: beweg,
        cylinder: mech,
        axiomPump: axiom,
        desamalatzion: desa,
        asymilation: asym,
        timestamp: new Date().toISOString()
    };
}

export default RUN3PLUS;
