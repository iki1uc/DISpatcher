// ─── UNI‑MARKT · API‑Modul ─────────────────────────────────────
// Universeller Markt‑Motor für DISpatcher + PATCH + mindMARKT

export const MARKET = {

    // Grundparameter
    state: {
        kapital: 100,
        risiko: 1.0,
        schwung: 1.0,
        industrie: 1.0,
        boerse: 1.0,
        zeit: 1.0
    },

    // Setzen von Marktparametern
    set(params = {}) {
        Object.assign(this.state, params);
        return this;
    },

    // Axiom‑Vektoren
    axiomVector(key) {
        const AX = {
            d: 1.11, e: 1.33, i: 0.77,
            n: 0.92, o: 1.44, r: 1.66,
            s: 1.21, w: 1.55, u: 2.00
        };
        return AX[key] ?? 1;
    },

    // Achsen‑Multiplikator
    axisFactor(axis) {
        return axis / 3; // universeller Faktor
    },

    // Markt‑Flow
    flow(axis, axiom) {
        const A = this.axisFactor(axis);
        const V = this.axiomVector(axiom);
        const S = this.state;

        return {
            kapitalFlow: S.kapital * A * V,
            risikoFlow: S.risiko * V,
            industrieFlow: S.industrie * A,
            boersenFlow: S.boerse * S.schwung * V,
            zeitFlow: S.zeit * A,
            timestamp: new Date().toISOString()
        };
    }
};
