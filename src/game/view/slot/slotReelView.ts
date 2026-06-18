import { Container, TilingSprite } from 'pixi.js';
import { SlotReelModel } from '../../model/slotReelModel';
import { tileHeight, tileWidth } from './constants';
import { getReelTexture } from './utils';

export class SlotReelView extends Container {
    private _tileSet!: TilingSprite;

    public constructor(private readonly _model: SlotReelModel) {
        super({
            label: 'SlotReelView',
        });

        this._createTiles();
    }

    public setTilePosition(position: number): void {
        const tileY = tileHeight * position;
        this._tileSet.tilePosition.y = -tileY;
    }

    private _createTiles(): void {
        const { band } = this._model;

        this._tileSet = new TilingSprite({
            texture: getReelTexture(band),
            width: tileWidth,
            height: tileHeight * band.length,
        });
        this.addChild(this._tileSet);
    }
}
