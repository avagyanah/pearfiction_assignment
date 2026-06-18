import { IGridConfig } from '#libs/grid/types';
import { services } from '../../../services';

export const getGameGridConfig = (): IGridConfig => {
    const { bounds } = services.stage;
    const { x, y, width, height } = bounds;

    return {
        area: { x, y, width, height },
        cells: [
            {
                name: 'slot_machine',
                bounds: { x: 0, y: 0, width: 1, height: 0.6 },
                padding: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
            },
        ],
    };
};
