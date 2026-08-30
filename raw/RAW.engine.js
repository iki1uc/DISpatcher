// ─── RAW‑ENGINE ─────────────────────────────────────────────
// Lädt DirectV, CPU, GPU, Roh‑Torque

export const RAW = {

    modules: {},

    async load() {
        const files = [
            "DirectV.ready",
            "cpu.ready",
            "gpu.ready",
            "rawtor.aktiv",
            "rom.ready"
        ];

        for (const f of files) {
            const mod = await import(`./${f}`);
            this.modules[f] = mod.READY ?? mod.default ?? mod;
        }

        return this.modules;
    }
};

