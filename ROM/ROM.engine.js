// ─── ROM‑ENGINE ─────────────────────────────────────────────
// Lädt alle ROM‑Gesetze (Axiome)

export const ROM = {

    axioms: {},

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
            const mod = await import(`./${f}`);
            this.axioms[f] = mod.default ?? mod;
        }

        return this.axioms;
    }
};

