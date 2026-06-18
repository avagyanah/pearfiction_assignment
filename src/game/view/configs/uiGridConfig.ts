import { GridCellAlign, GridCellScale, IGridConfig } from '#libs/grid/types';
import { services } from '../../../services';

export const getUiGridConfig = (): IGridConfig => {
    const { bounds } = services.stage;
    const { x, y, width, height } = bounds;

    return {
        area: { x, y, width, height },
        cells: [
            {
                name: 'spin_button',
                bounds: { x: 0.35, y: 0.7, width: 0.3, height: 0.3 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
                align: GridCellAlign.centerTop,
                scale: GridCellScale.fit,
            },
        ],
    };
};
