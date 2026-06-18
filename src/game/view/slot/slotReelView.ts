import { Container } from 'pixi.js';
import { SlotReelModel } from '../../model/slotReelModel';
import { tileHeight } from './constants';
import { SlotTileView } from './slotTileView';

export class SlotReelView extends Container {
    public constructor(private readonly _model: SlotReelModel) {
        super();

        this._createTiles();
    }

    private _createTiles(): void {
        const { band } = this._model;

        band.forEach((tileId, index) => {
            const tileView = new SlotTileView(tileId);
            tileView.position.set(0, index * tileHeight);
            this.addChild(tileView);

            // const reelView = new SlotReelView(reel);
            // this.addChild(reelView);

            // this._reels.push(reelView);
        });
    }
}
