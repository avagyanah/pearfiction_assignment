import { Assets, ProgressCallback } from 'pixi.js';
import { ASSETS } from './const';
import { wait } from './utils';

export class Loader {
    public async loadAssets(
        onProgress?: ProgressCallback,
        onComplete?: CallableFunction
    ): Promise<void> {
        /* Correct way: but loading happens too fast and preloader screen is not getting visible */
        {
            // await Assets.load(ASSETS, onProgress);
            // onComplete?.();
        }

        /* Incorrect way: loading each asset individually, to make progress be seen, with delay between each asset load */
        {
            for (const [index, asset] of ASSETS.entries()) {
                await Assets.load(asset);
                onProgress?.((index + 1) / ASSETS.length);

                await wait(0);
            }

            await wait(100);
            onComplete?.();
        }
    }
}
