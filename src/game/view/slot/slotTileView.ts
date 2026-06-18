import { Sprite, Texture } from 'pixi.js';
import { TileID } from '../../model/types';

export class SlotTileView extends Sprite {
    public constructor(tileId: TileID) {
        super(Texture.from(tileId));
    }
}
