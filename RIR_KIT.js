// ─── RIR_KIT.js · REPARIERT ──────────────────────────────────
// Verbindet RIR.Core + KIT.js sauber

import { RIR } from "./RIR.Core.js";
import { KIT } from "./KIT.js";   // KIT wird importiert

export function RIR_KIT(input) {
    const check = RIR.return(input);

    if (check.RIR === "reject") {
        return { status: "reject", source: "RIR" };
    }

    // KIT.run() – NICHT KIT_RUN()
    return KIT.run(input);
}
