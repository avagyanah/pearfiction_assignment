import { Grid } from '#libs/grid';
import { IGridConfig } from '#libs/grid/types';
import { SpinButton } from '../components/spinButton';
import { getUiGridConfig } from '../configs/uiGridConfig';

export class UiScene extends Grid {
    private _spinButton!: SpinButton;

    public constructor() {
        super(getUiGridConfig());
    }

    public create() {
        const button = new SpinButton();
        this.attach('spin_button', button);
    }

    public getGridConfig(): IGridConfig {
        return getUiGridConfig();
    }
}
