import { Bounds, Container, Graphics } from 'pixi.js';
import { SLOT_CONST } from '../../../const';
import { services } from '../../../services';
import { getWinLineColor } from '../../../utils';
import { SlotMachineModel } from '../../model/slotMachineModel';
import { IWinResult } from '../../model/types';
import { WinLine } from '../components/winLine';
import { SlotReelView } from './slotReelView';

export class SlotMachineView extends Container {
    private _bg: Graphics = new Graphics();
    private _winLines: WinLine[] = [];
    private _reels: SlotReelView[] = [];

    public constructor(private readonly _model: SlotMachineModel) {
        super({
            label: 'SlotMachine',
        });

        this._createReels();
        this._createBg();

        services.emitter.on('positions_update', this._setPositions, this);
        services.emitter.on('result_update', this._setResult, this);
    }

    public getLocalBounds(): Bounds {
        return this._bg.getLocalBounds();
    }

    private _createBg(): void {
        const { tileWidth, tileHeight, cols, rows } = SLOT_CONST;

        const width = tileWidth * cols;
        const height = tileHeight * rows;

        this._bg.rect(0, 0, width, height);
        this._bg.stroke({ width: 5, color: 'cyan' });

        const mask = this._bg.clone(true);
        mask.fill('cyan');
        this.addChild(mask);

        this.mask = mask;

        this.addChild(this._bg);
    }

    private _createReels(): void {
        const { reels } = this._model;
        const { tileWidth } = SLOT_CONST;

        reels.forEach((reel, index) => {
            const reelView = new SlotReelView(reel);
            reelView.position.set(index * tileWidth, 0);
            this.addChild(reelView);

            this._reels.push(reelView);
        });
    }

    private _clearWinLines(): void {
        this._winLines.forEach(line => this.removeChild(line));
        this._winLines = [];
    }

    private _setPositions(): void {
        const { reels } = this._model;

        this._clearWinLines();

        reels.forEach((reel, index) => {
            this._reels[index].setTilePosition(reel.position);
        });
    }

    private _setResult(result: IWinResult): void {
        this._clearWinLines();

        if (result.wins.length === 0) {
            return;
        }

        this._drawWins(result.wins);
    }

    private _drawWins(wins: IWinResult['wins']): void {
        wins.forEach((win, i) => {
            const line = new WinLine();
            const payline = this._model.getPayline(win.paylineId);
            const color = getWinLineColor(i);

            line.draw(win, payline, color);
            this.addChildAt(line, 0);
            this._winLines.push(line);
        });
    }
}
