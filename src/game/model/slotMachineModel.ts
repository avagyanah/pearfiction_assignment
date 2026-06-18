import { services } from '../../services';
import manifest from './manifest.json';
import { SlotReelModel } from './slotReelModel';
import { IManifest } from './types';

export class SlotMachineModel {
    private _reels: SlotReelModel[] = [];

    public constructor() {
        //
    }

    public initialize(data: IManifest = manifest as IManifest): this {
        this._reels = data.reelset.map(band => new SlotReelModel(band, 0));

        return this;
    }

    public setResult(sequence: number[]): void {
        sequence.forEach((pos, index) => {
            this._reels[index].setPosition(pos);
        });

        services.emitter.emit('result_update');
    }

    public get reels(): SlotReelModel[] {
        return this._reels;
    }
}
