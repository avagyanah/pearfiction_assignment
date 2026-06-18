import { Grid } from '#libs/grid';
import { IGridConfig } from '#libs/grid/types';
import { SlotMachineModel } from '../../model/slotMachineModel';
import { getGameGridConfig } from '../configs/gameGridConfig';
import { SlotMachineView } from '../slot/slotMachineView';

export class GameScene extends Grid {
    private _slotMachine!: SlotMachineView;

    public constructor() {
        super(getGameGridConfig());
    }

    public create() {
        this._slotMachine = new SlotMachineView(new SlotMachineModel());
        this.attach('slot_machine', this._slotMachine);
    }

    public getGridConfig(): IGridConfig {
        return getGameGridConfig();
    }
}
