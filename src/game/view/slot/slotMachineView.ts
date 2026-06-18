import { Bounds, Container, Graphics } from 'pixi.js';
import { SlotMachineModel } from '../../model/slotMachineModel';
import { cols, rows, tileHeight, tileWidth } from './constants';
import { SlotReelView } from './slotReelView';

export class SlotMachineView extends Container {
    private _bg: Graphics = new Graphics();
    private _reels: SlotReelView[] = [];

    public constructor(private readonly _model: SlotMachineModel) {
        super();

        this._createReels();
        this._createBg();
    }

    public getLocalBounds(): Bounds {
        return this._bg.getLocalBounds();
    }

    private _createBg(): void {
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

        reels.forEach((reel, index) => {
            const reelView = new SlotReelView(reel);
            reelView.position.set(index * tileWidth, 0);
            this.addChild(reelView);

            this._reels.push(reelView);
        });
    }
}
