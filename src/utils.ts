import { Ticker } from 'pixi.js';
import { WIN_LINE_COLORS } from './const';
import { services } from './services';

export const wait = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => {
        const { ticker } = services;
        let elapsed = 0;

        const tick = (t: Ticker): void => {
            elapsed += t.deltaMS;

            if (elapsed >= milliseconds) {
                ticker.remove(tick);
                resolve();
            }
        };

        ticker.add(tick);
    });
};

export const getWinLineColor = (index: number): string => {
    return WIN_LINE_COLORS[index % WIN_LINE_COLORS.length];
};
