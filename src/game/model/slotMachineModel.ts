import manifest from './manifest.json';
import { SlotReelModel } from './slotReelModel';
import { IManifest } from './types';

export class SlotMachineModel {
    private _reels: SlotReelModel[];

    public constructor(data: IManifest = manifest as IManifest) {
        this._reels = data.reelset.map(band => new SlotReelModel(band, 0));
    }

    public get reels(): SlotReelModel[] {
        return this._reels;
    }
}
