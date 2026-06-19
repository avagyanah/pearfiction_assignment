import { Text } from 'pixi.js';
import { getWinLineColor } from '../../../utils';
import { IWinResult } from '../../model/types';

export class WinText extends Text {
    public constructor() {
        super({
            style: {
                align: 'center',
                lineHeight: 70,
                fontSize: 60,
                fill: 'white',
                tagStyles: {
                    totalWin: { fontWeight: 'bold' },
                    win0: { fill: getWinLineColor(0) },
                    win1: { fill: getWinLineColor(1) },
                    win2: { fill: getWinLineColor(2) },
                    win3: { fill: getWinLineColor(3) },
                },
            },
        });
    }

    public setResult(result: IWinResult): void {
        let text = '<totalWin>Total wins: 0</totalWin>';

        if (result.wins.length > 0) {
            const lines = [
                `<totalWin>Total wins: ${result.totalWin}</totalWin>`,
                ...result.wins.map(
                    (w, i) =>
                        `<win${i}>- payline ${w.paylineId}, ${w.symbol} x${w.count}, ${w.payout}</win${i}>`
                ),
            ];

            text = lines.join('\n');
        }

        this.text = text;
    }
}
