import { Grid } from '#libs/grid';
import { IGridConfig } from '#libs/grid/types';
import { services } from '../../../services';
import { IWinResult } from '../../model/types';
import { SpinButton } from '../components/spinButton';
import { WinText } from '../components/winText';
import { getUiGridConfig } from '../configs/uiGridConfig';

export class UiScene extends Grid {
    private _spinButton!: SpinButton;
    private _winText!: WinText;

    public constructor() {
        super(getUiGridConfig());

        services.emitter.on('result_update', this._onResult, this);
    }

    public create() {
        this._spinButton = new SpinButton();
        this.attach('spin_button', this._spinButton);

        this._winText = new WinText();
        this.attach('win_text', this._winText);
    }

    public getGridConfig(): IGridConfig {
        return getUiGridConfig();
    }

    private _onResult(result: IWinResult): void {
        this._winText.setResult(result);
        this.rebuild();
    }
}
