// ───────────────────────────────────────────────
// RUN 3+  ·  AUTO-LOADER VERSION
// lädt alle neuen Engines, auch wenn einige fehlen
// ───────────────────────────────────────────────

function safeImport(path) {
    try {
        return require(path);
    } catch (e) {
        return null;
    }
}

export async function RUN3PLUS(input = {}) {

    // 1) Bewegung (optional)
    const BEWEGUNG = safeImport("./bewegung.ready");
    const beweg = BEWEGUNG ? BEWEGUNG.set(input).compute() : {
        axis: 3,
        axiom: "e",
        info: "bewegung.ready fehlt – Default benutzt"
    };

    // 2) Cylinder Pump (RAW)
    const CYLINDER = safeImport("../raw/cylinder.pump");
    const mech = CYLINDER
        ? CYLINDER.set({ axis: beweg.axis }).pump(3)
        : { info: "cylinder.pump fehlt – RAW deaktiviert" };

    // 3) Axiom Pump Origin (ROM)
    const AXIOMPUMP = safeImport("../ROM/axiom.pump.origin");
    const axiom = AXIOMPUMP
        ? AXIOMPUMP.set({ axiom: beweg.axiom }).compute()
        : { axiom: beweg.axiom, info: "axiom.pump.origin fehlt – Default" };

    // 4) Desamalatzion (Worldbrecher)
    const DESA = safeImport("./desamalatzion.ready");
    const desa = DESA
        ? DESA.set({
            raum: input.raum ?? "default",
            axiom: beweg.axiom,
            axis: beweg.axis
        }).compute()
        : { info: "desamalatzion.ready fehlt – Raum bleibt stabil" };

    // 5) Asymilation (Dispatcher)
    const ASYM = safeImport("./asymilation.ready");
    const asym = ASYM
        ? ASYM.set({
            raum: desa.raum_neu ?? "default",
            axiom: axiom.axiom,
            axis: beweg.axis,
            hdf: safeImport("./asymilation.hdf.rom")
        }).compute()
        : { info: "asymilation.ready fehlt – keine Integration" };

    // 6) Alle HDF-Zonen automatisch laden
    const HDF_ZONEN = {};
    const buchstaben = ["d","e","i","n","o","r","s","u","w"];

    buchstaben.forEach(b => {
        const hdf = safeImport(`../${b}/${b}.hdf.rom`);
        if (hdf) HDF_ZONEN[b] = hdf;
    });

    // 7) Ergebnis
    return {
        RUN: "RUN3+ AUTO",
        bewegung: beweg,
        cylinder: mech,
        axiomPump: axiom,
        desamalatzion: desa,
        asymilation: asym,
        hdfZonen: HDF_ZONEN,
        timestamp: new Date().toISOString()
    };
}

export default RUN3PLUS;
