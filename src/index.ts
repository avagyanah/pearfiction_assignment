import { App } from './app';

(async () => {
    const app = new App();

    await app.init();
    await app.start();
    await app.load();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__PIXI_STAGE__ = app.stage;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__PIXI_RENDERER__ = app.renderer;
})();
