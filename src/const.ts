import { AutoDetectOptions } from 'pixi.js';

export const getRendererOptions = (): Partial<AutoDetectOptions> => {
    return {
        canvas: document.getElementById('game_canvas') as HTMLCanvasElement,
        backgroundColor: '#343434',
        resolution: window.devicePixelRatio ?? 1,
    };
};
