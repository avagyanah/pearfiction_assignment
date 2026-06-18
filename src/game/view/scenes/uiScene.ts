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
        this._spinButton = new SpinButton();
        this.attach('spin_button', this._spinButton);
    }

    public getGridConfig(): IGridConfig {
        return getUiGridConfig();
    }
}
