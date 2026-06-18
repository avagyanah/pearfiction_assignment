import { Assets } from 'pixi.js';
import { ASSETS } from './const';
import { services } from './services';
import { wait } from './utils';

export class Loader {
    public async loadAssets(): Promise<void> {
        /* Correct way: but loading happens too fast and preloader screen is not getting visible */
        // {
        //     await Assets.load(ASSETS, this._onLoadProgress);
        //     this._onLoadComplete();
        // }

        /* Incorrect way: loading each asset individually, to make progress be seen, with delay between each asset load */
        {
            for (const [index, asset] of ASSETS.entries()) {
                await Assets.load(asset);

                this._onLoadProgress((index + 1) / ASSETS.length);

                await wait(40);
            }

            await wait(200);
            this._onLoadComplete();
        }
    }

    private readonly _onLoadProgress = (progress: number): void => {
        services.emitter.emit('load_progress', progress);
    };

    private readonly _onLoadComplete = (): void => {
        services.emitter.emit('load_complete');
    };
}
