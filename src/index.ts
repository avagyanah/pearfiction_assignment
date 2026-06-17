import { Application } from 'pixi.js';

const app = new Application();

(async () => {
    await app.init({
        resizeTo: window,
            background: '#343434',
    });

    document.body.appendChild(app.canvas);
})();
