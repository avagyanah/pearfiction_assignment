import { SLOT_CONST } from '../../const';
import { IManifest, IWinResult, TileID, TileMatrix } from './types';

export class MathEngine {
    public constructor(private readonly _data: IManifest) {
        //
    }

    public calculate(positions: number[]): IWinResult {
        const screen: TileMatrix = this._generateScreen(positions);
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

        return {
            totalWin: wins.reduce((sum, win) => sum + win.payout, 0),
            wins,
        };
    }

    private _generateScreen(positions: number[]): TileMatrix {
        const { rows } = SLOT_CONST;

        return Array.from({ length: rows }, (_, row) =>
            this._data.reelset.map((band, col) => band[(positions[col] + row) % band.length])
        );
    }
}
