import { Bounds, Container, Graphics } from 'pixi.js';
import { SLOT_CONST } from '../../../const';
import { services } from '../../../services';
import { SlotMachineModel } from '../../model/slotMachineModel';
import { IWinResult } from '../../model/types';
import { SlotReelView } from './slotReelView';

export class SlotMachineView extends Container {
    private _bg: Graphics = new Graphics();
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

    private _setPositions(): void {
        const { reels } = this._model;

        reels.forEach((reel, index) => {
            this._reels[index].setTilePosition(reel.position);
        });
    }

    private _setResult(result: IWinResult): void {
        console.warn(result);
    }
}
