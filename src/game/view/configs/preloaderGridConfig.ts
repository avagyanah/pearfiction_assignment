import { GridCellAlign, GridCellScale, IGridConfig } from '#libs/grid/types';
import { services } from '../../../services';

export const getPreloaderGridConfig = (): IGridConfig => {
    const { bounds } = services.stage;
    const { x, y, width, height } = bounds;

    return {
        area: { x, y, width, height },
        cells: [
            {
                name: 'progress',
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
                align: GridCellAlign.center,
                scale: GridCellScale.fit,
            },
        ],
    };
};
