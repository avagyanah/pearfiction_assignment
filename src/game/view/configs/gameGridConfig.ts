import { GridCellAlign, GridCellScale, IGridConfig } from '../../../libs/grid/types';
import { services } from '../../../services';

export const getGameGridConfig = (): IGridConfig => {
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
