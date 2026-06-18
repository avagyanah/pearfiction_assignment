import { Graphics } from 'pixi.js';
import { SLOT_CONST } from '../../../const';
import { IWinLine } from '../../model/types';

export class WinLine extends Graphics {
    public draw(win: IWinLine, payline: number[][], color: string): void {
        this.clear();

        const { tileWidth, tileHeight } = SLOT_CONST;
        const points: { x: number; y: number }[] = [];

        for (let col = 0; col < win.count; col++) {
            const row = payline.findIndex(r => r[col] === 1);
            points.push({
                x: col * tileWidth + tileWidth / 2,
                y: row * tileHeight + tileHeight / 2,
            });
        }

        points.forEach((p, i) => {
            if (i === 0) {
                this.moveTo(p.x, p.y);
            } else {
                this.lineTo(p.x, p.y);
            }
        });

        this.stroke({
            width: 40,
            color,
            alpha: 0.4,
            cap: 'round',
            join: 'round',
        });
    }
}
