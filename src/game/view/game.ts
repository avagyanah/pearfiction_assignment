import { Graphics, Sprite } from 'pixi.js';
import { Grid } from '../../libs/grid';
import { IGridConfig } from '../../libs/grid/types';
import { getGameGridConfig } from './configs/gameGridConfig';

export class GameScene extends Grid {
    public constructor() {
        super(getGameGridConfig());
    }

    public create() {
        const machine = new Graphics().rect(0, 0, 200, 200).fill(0xff0000);
        const button = Sprite.from('hv1');

        this.attach('slot_machine', machine);
        this.attach('spin_button', button);
    }

    public getGridConfig(): IGridConfig {
        return getGameGridConfig();
    }
}
