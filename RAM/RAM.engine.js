// ─── RAM‑ENGINE ─────────────────────────────────────────────
// Lädt alle RAM‑Module dynamisch

export const RAM = {

    modules: {},

    async load() {
        const files = [
            "ram1.ready",
            "ram3.ready",
            "ram9.ready",
            "ram27.ready",
            "ram81.ready",
            "ram243.ready",
            "ram729.ready",
            "ram.active"
        ];

        for (const f of files) {
            const mod = await import(`./${f}`);
            this.modules[f] = mod.READY ?? mod.default ?? mod;
        }

        return this.modules;
    }
};
