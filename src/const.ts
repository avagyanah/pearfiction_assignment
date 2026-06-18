import { AutoDetectOptions, UnresolvedAsset } from 'pixi.js';

export const getRendererOptions = (): Partial<AutoDetectOptions> => {
    return {
        canvas: document.getElementById('game_canvas') as HTMLCanvasElement,
        backgroundColor: '#565656',
        resolution: window.devicePixelRatio ?? 1,
    };
};

export const ASSETS: UnresolvedAsset[] = [
    { alias: 'hv1', src: 'assets/hv1_symbol.png' },
    { alias: 'hv2', src: 'assets/hv2_symbol.png' },
    { alias: 'hv3', src: 'assets/hv3_symbol.png' },
    { alias: 'hv4', src: 'assets/hv4_symbol.png' },
    { alias: 'lv1', src: 'assets/lv1_symbol.png' },
    { alias: 'lv2', src: 'assets/lv2_symbol.png' },
    { alias: 'lv3', src: 'assets/lv3_symbol.png' },
    { alias: 'lv4', src: 'assets/lv4_symbol.png' },
    { alias: 'spin_button', src: 'assets/spin_button.png' },
];

export const SLOT_CONST = {
    rows: 3,
    cols: 5,
    tileCount: 20,
    tileWidth: 256,
    tileHeight: 256,
};

export const WIN_LINE_COLORS = ['#ffc400', '#00ff00', '#0000ff', '#4584cd'];
