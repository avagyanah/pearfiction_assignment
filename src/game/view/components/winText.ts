import { Container, SplitText } from 'pixi.js';
import { getWinLineColor } from '../../../utils';
import { IWinResult } from '../../model/types';

export class WinText extends Container {
    private _label!: SplitText;

    public constructor() {
        super();

        this._label = new SplitText({
            text: ' ',
            style: {
                align: 'center',
                lineHeight: 70,
                fontSize: 60,
                fill: 'white',
                tagStyles: {
                    title: { fontWeight: 'bold' },
                    win0: { fill: getWinLineColor(0) },
                    win1: { fill: getWinLineColor(1) },
                    win2: { fill: getWinLineColor(2) },
                    win3: { fill: getWinLineColor(3) },
                },
            },
        });

        this.addChild(this._label);
    }

    public setResult(result: IWinResult): void {
        this._label.text = ' ';

        if (result.wins.length === 0) {
            this._label.text = `<title>No Win</title>`;
            return;
        }

        const lines = [
            `<title>Total wins: ${result.totalWin}</title>`,
            ...result.wins.map(
                (w, i) =>
                    `<win${i}>- payline ${w.paylineId}, ${w.symbol} x${w.count}, ${w.payout}</win${i}>`
            ),
        ];

        this._label.text = lines.join('\n');
    }
}
