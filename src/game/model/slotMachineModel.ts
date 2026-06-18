import { services } from '../../services';
import { MathEngine } from './mathEngine';
import manifest from './slot_manifest.json';
import { SlotReelModel } from './slotReelModel';
import { IManifest, IWinResult } from './types';

export class SlotMachineModel {
    private _reels: SlotReelModel[] = [];
    private _data: IManifest = manifest as IManifest;
    private _result: IWinResult = { totalWin: 0, wins: [] };
    private _engine: MathEngine = new MathEngine(this._data);

    public get result(): IWinResult {
        return this._result;
    }

    public get reels(): SlotReelModel[] {
        return this._reels;
    }

    public getPayline(paylineId: number): number[][] {
        return this._data.paylines[paylineId - 1];
    }

    public initialize(data: IManifest = manifest as IManifest): this {
        this._data = data;
        this._engine = new MathEngine(data);
        this._reels = data.reelset.map(band => new SlotReelModel(band, 0));

        return this;
    }

    public setInitialPositions(): void {
        this.setPositions(this._data.initialPositions);
    }

    public setPositions(sequence: number[]): void {
        sequence.forEach((pos, index) => {
            this._reels[index].setPosition(pos);
        });

        services.emitter.emit('positions_update');
    }

    public calculateResult(): void {
        const positions = this._reels.map(reel => reel.position);

        this._result = this._engine.calculate(positions);

        services.emitter.emit('result_update', this._result);
    }
}
