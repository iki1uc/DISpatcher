export async function prefetch() {
    const ROM = await import("../ROM/ROM.engine.js");
    const RAM = await import("../RAM/RAM.engine.js");
    const RAW = await import("../raw/RAW.engine.js");

    await ROM.ROM.load();
    await RAM.RAM.load();
    await RAW.RAW.load();

    return "prefetch complete";
}
