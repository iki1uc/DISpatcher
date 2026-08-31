// ─── ROM‑ENGINE · DISpatcher‑Imperium ─────────────────────────────
// Lädt alle ROM‑Gesetze, validiert sie, synchronisiert sie mit PQ/RAM,
// und stellt sie der RUN‑Engine stabil zur Verfügung.

export const ROM = {

    cluster: "ROM",
    state: "READY",
    mode: "STABLE",

    axioms: {},
    axes: ["d","e","i","n","o","r","s","u","w"],

    async load() {
        const files = [
            "d.hdf.rom",
            "e.hdf.rom",
            "i.hdf.rom",
            "n.hdf.rom",
            "o.hdf.rom",
            "r.hdf.rom",
            "s.hdf.rom",
            "u.hdf.rom",
            "w.hdf.rom",
            "rom.syn.ready"
        ];

        for (const f of files) {
            try {
                const mod = await import(`./${f}`);
                this.axioms[f] = mod.default ?? mod;
            } catch (err) {
                this.axioms[f] = { error: true, file: f };
            }
        }

        return this.axioms;
    },

    // PQ‑Sync
    async syncPQ(axis) {
        return fetch(`../PQ/${axis}.hdf.rom`)
            .then(r => r.text())
            .catch(() => "PQ:OFF");
    },

    // RAM‑Hot‑Sync
    async syncRAM(axis) {
        return fetch(`../RAM/${axis}.hdf.rom`)
            .then(r => r.text())
            .catch(() => "RAM:OFF");
    },

    // Axiom‑Validator
    validate(axis) {
        const file = `${axis}.hdf.rom`;
        const ax = this.axioms[file];

        return {
            axis,
            file,
            loaded: !!ax,
            error: ax?.error ?? false,
            status: ax?.state ?? "UNKNOWN"
        };
    },

    // RUN‑Bindung
    run(axis = "e") {
        return {
            axis,
            rom: this.validate(axis),
            timestamp: new Date().toISOString(),
            status: "RUN‑ROM"
        };
    }
};
