import { IGridConfig } from '#libs/grid/types';
import { services } from '../../../services';

export const getUiGridConfig = (): IGridConfig => {
    const { bounds } = services.stage;
    const { x, y, width, height } = bounds;

    return {
        area: { x, y, width, height },
        cells: [
            {
                name: 'spin_button',
                bounds: { x: 0.3, y: 0.57, width: 0.4, height: 0.2 },
            },
            {
                name: 'win_text',
                bounds: { x: 0.05, y: 0.78, width: 0.9, height: 0.21 },
            },
        ],
    };
};
