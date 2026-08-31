async loadReady(path) {
    const mod = await import(path);
    return mod.READY ?? mod.default;
}
async syn(path, input = {}) {
    const READY = await this.loadReady(path);

    READY.set(input);
    const output = READY.compute();
return {
    pipeline: this.name,
    module: READY.name,
    input: READY.input,
    output,
    timestamp: new Date().toISOString()
};
