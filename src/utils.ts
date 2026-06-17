import { Ticker } from 'pixi.js';
import { services } from './services';

export const wait = (seconds: number): Promise<void> => {
    return new Promise(resolve => {
        const { ticker } = services;
        const target = seconds * 1000;
        let elapsed = 0;

        const tick = (t: Ticker): void => {
            elapsed += t.deltaMS;

            if (elapsed >= target) {
                ticker.remove(tick);
                resolve();
            }
        };

        ticker.add(tick);
    });
};
