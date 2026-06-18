import { Container, TilingSprite } from 'pixi.js';
import { SLOT_CONST } from '../../../const';
import { SlotReelModel } from '../../model/slotReelModel';
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
        const { tileHeight } = SLOT_CONST;

        const tileY = tileHeight * position;
        this._tileSet.tilePosition.y = -tileY;
    }

    private _createTiles(): void {
        const { tileWidth, tileHeight } = SLOT_CONST;

        const { band } = this._model;

        this._tileSet = new TilingSprite({
            texture: getReelTexture(band),
            width: tileWidth,
            height: tileHeight * band.length,
        });
        this.addChild(this._tileSet);
    }
}
