import { SLOT_CONST } from '../../const';
import { services } from '../../services';
import manifest from './slot_manifest.json';
import { SlotReelModel } from './slotReelModel';
import { IManifest, IWinResult, TileID, TileMatrix } from './types';

export class SlotMachineModel {
    private _reels: SlotReelModel[] = [];
    private _data: IManifest = manifest as IManifest;
    private _result: IWinResult = { totalWin: 0, wins: [] };

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
        // Step1: get flat matrix of visible screen 3x5 (row x col)
        const screen: TileMatrix = this._getTilesMatrix();

        const wins: IWinResult['wins'] = [];

        this._data.paylines.forEach((payline, paylineIndex) => {
            // Step2: collect symbols from screen where payline matrix is marked as 1
            const symbols: TileID[] = [];

            for (let col = 0; col < SLOT_CONST.cols; col++) {
                for (let row = 0; row < SLOT_CONST.rows; row++) {
                    if (payline[row][col] === 1) {
                        symbols.push(screen[row][col]);
                    }
                }
            }

            // Step3: count consecutive matches from the left
            const lead = symbols[0];
            const breakAt = symbols.findIndex(s => s !== lead);
            const count = breakAt === -1 ? symbols.length : breakAt;

            // Step4: if count >= 3, record a win
            if (count >= 3) {
                wins.push({
                    paylineId: paylineIndex + 1,
                    symbol: lead,
                    count,
                    payout: this._data.paytable[lead][count - 3],
                });
            }
        });

        this._result = {
            totalWin: wins.reduce((sum, win) => sum + win.payout, 0),
            wins,
        };

        services.emitter.emit('result_update', this._result);
    }

    private _getTilesMatrix(): TileMatrix {
        const { rows } = SLOT_CONST;

        return Array.from({ length: rows }, (_, row) =>
            this._reels.map(reel => reel.band[(reel.position + row) % reel.band.length])
        );
    }
}
