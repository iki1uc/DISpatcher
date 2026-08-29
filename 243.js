// ─── 243.js · Proxy + Routing + DQF + XyX ──────────────────

import { baseDQF } from "./3.js";
import { extendedDQF } from "./81.js";
import { XyX } from "./XyX.js";

// ─── Proxy ──────────────────────────────────────────────────
function getState(prop) {
    if (typeof prop !== 'string') return undefined;
    const parts = prop.split(',');
    return parts.map(p => p.trim());
}

export const stateProxy = new Proxy({}, {
    get(_, prop) {
        return getState(prop);
    }
});

// ─── Router ─────────────────────────────────────────────────
export function route243(x, y, z) {
    const sum = x + y + z;
    let result = {};

    if (sum % 9 === 0) {
        result = { ...extendedDQF(x, y, z), tier: "extended" };
    } else if (sum % 3 === 0) {
        result = { ...baseDQF(x, y, z), tier: "base" };
    } else {
        result = { ...XyX(x, y, z), tier: "xyx" };
    }

    return {
        input: { x, y, z },
        sum,
        result,
        proxy: stateProxy[x, y, z],
        timestamp: new Date().toISOString()
    };
}
