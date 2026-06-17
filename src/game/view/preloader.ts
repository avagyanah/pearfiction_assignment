import { Container, Graphics, Text } from 'pixi.js';
import { Grid } from '../../libs/grid';
import { IGridConfig } from '../../libs/grid/types';
import { getPreloaderGridConfig } from './configs/preloaderGridConfig';

export class PreloaderScene extends Grid {
    private _view!: Container;
    private _progressLabel!: ProgressLabel;
    private _progressBar!: ProgressBar;

    public constructor() {
        super(getPreloaderGridConfig());

        this._view = new Container();
        this.attach('progress', this._view);
    }

    public getGridConfig(): IGridConfig {
        return getPreloaderGridConfig();
    }

    public create() {
        this._progressLabel = new ProgressLabel();
        this._progressBar = new ProgressBar();
        this._progressBar.y += 30;

        this._view.addChild(this._progressLabel);
        this._view.addChild(this._progressBar);

        this.rebuild();
    }

    public readonly setLoadProgress = (progress: number): void => {
        this._progressLabel.setProgress(progress);
        this._progressBar.setProgress(progress);
    };
}

class ProgressLabel extends Text {
    public constructor() {
        super();

        this.anchor.set(0.5);
        this.style.fill = 0xffffff;
    }

    public setProgress(progress: number): void {
        this.text = `${Math.floor(progress * 100)}%`;
    }
}

class ProgressBar extends Container {
    private static readonly WIDTH = 200;
    private static readonly HEIGHT = 10;

    private _bg!: Graphics;
    private _fill!: Graphics;

    public constructor() {
        super();

        const w = ProgressBar.WIDTH;
        const h = ProgressBar.HEIGHT;

        this._bg = new Graphics();
        this._fill = new Graphics();

        this._bg.roundRect(-w * 0.5, -h * 0.5, w, h, h * 0.5).stroke('cyan');

        this.addChild(this._bg);
        this.addChild(this._fill);
    }

    public setProgress(progress: number): void {
        const w = ProgressBar.WIDTH;
        const h = ProgressBar.HEIGHT;

        this._fill.clear();
        this._fill.roundRect(-w * 0.5, -h * 0.5, w * progress, h, h * 0.5).fill('cyan');
    }
}
