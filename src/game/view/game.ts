import { Graphics } from 'pixi.js';
import { Grid } from '../../libs/grid';
import { GridCellAlign, GridCellScale, IGridConfig } from '../../libs/grid/types';
import { services } from '../../services';

const getGameGridConfig = (): IGridConfig => {
    const { x, y, width, height } = services.stage.bounds;

    return {
        area: { x, y, width, height },
        cells: [
            {
                name: 'slot_machine',
                bounds: { x: 0, y: 0, width: 1, height: 0.7 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
                align: GridCellAlign.center,
                scale: GridCellScale.fit,
            },
            {
                name: 'spin_button',
                bounds: { x: 0, y: 0.7, width: 1, height: 0.3 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
                align: GridCellAlign.center,
                scale: GridCellScale.fit,
            },
        ],
    };
};

export class Game extends Grid {
    public constructor() {
        super(getGameGridConfig());
    }

    public create() {
        const machine = new Graphics().rect(0, 0, 200, 200).fill(0xff0000);
        const button = new Graphics().rect(0, 0, 100, 100).fill(0x0000ff);

        this.attach('slot_machine', machine);
        this.attach('spin_button', button);
    }

    public getGridConfig(): IGridConfig {
        return getGameGridConfig();
    }
}
