import { Text, TextStyle } from 'pixi.js';
import { IWinResult } from '../../model/types';

export class WinText extends Text {
    public constructor() {
        super();

        this.style = new TextStyle({
            fill: '#ffffff',
            fontSize: 28,
            align: 'center',
            lineHeight: 40,
        });
    }

    public setResult(result: IWinResult): void {
        if (result.wins.length === 0) {
            this.text = 'No Win';
            return;
        }

        const lines = [
            `Total wins: ${result.totalWin}`,
            ...result.wins.map(
                w => `- payline ${w.paylineId}, ${w.symbol} x${w.count}, ${w.payout}`
            ),
        ];

        this.text = lines.join('\n');
    }
}
