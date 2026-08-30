// ─── PIPELINE.BLITZ RUN3 ─────────────────────────────────────
// Lädt RAM, ROM, RAW, API, Markt, Core in einem Blitz‑Zug

import { RAM } from "../RAM/RAM.engine.js";
import { ROM } from "../ROM/ROM.engine.js";
import { RAW } from "../raw/RAW.engine.js";
import { MARKET } from "./market.js";
import { dispatchKnoten } from "./dispatch.knoten.js";

export async function RUN3(input) {

    // 1) Prefetch
    const rom = await ROM.load();
    const ram = await RAM.load();
    const raw = await RAW.load();

    // 2) Knoten bestimmen
    const knoten = dispatchKnoten(input);

    // 3) Marktfluss
    const markt = MARKET.flow(
        knoten.axis,
        knoten.axiom
    );

    // 4) RAW‑Kräfte
    const directV = raw["DirectV.ready"].compute();
    const torque = raw["rawtor.aktiv"].compute();

    // 5) RAM‑Speicher
    const ramZone = ram[`ram${knoten.axis}.ready`]?.compute();

    // 6) ROM‑Gesetz
    const romZone = rom[`${knoten.axiom}.hdf.rom`];

    // 7) Ergebnis
    return {
        knoten,
        markt,
        directV,
        torque,
        ramZone,
        romZone,
        timestamp: new Date().toISOString()
    };
}
