import { IRect } from '#libs/grid/types';
import { Container } from 'pixi.js';
import { services } from '../../services';
import { GameScene } from './scenes/gameScene';
import { PreloaderScene } from './scenes/preloaderScene';
import { UiScene } from './scenes/uiScene';
import { Orientation } from './types';

export class Stage extends Container {
    private _orientation: Orientation;
    private _element: HTMLElement;
    private _bounds: IRect;

    private _preloader!: PreloaderScene;
    private _game!: GameScene;
    private _ui!: UiScene;

    public constructor() {
        super();

        this._orientation = 'landscape';
        this._bounds = { x: 0, y: 0, width: 1, height: 1 };
        this._element = document.getElementById('game_div') as HTMLElement;

        window.addEventListener('resize', this._resize);
        this._resize();

        services.emitter.on('load_progress', this._onLoadProgress, this);
        services.emitter.once('load_complete', this._onLoadComplete, this);
    }

    public get bounds(): IRect {
        return this._bounds;
    }

    public get orientation(): Orientation {
        return this._orientation;
    }

    public init(): void {
        this._preloader = new PreloaderScene();
        this._game = new GameScene();
        this._ui = new UiScene();

        this.addChild(this._game);
        this.addChild(this._ui);
        this.addChild(this._preloader);

        this._preloader.create();
    }

    private _onLoadProgress(progress: number): void {
        this._preloader.setLoadProgress(progress);
    }

    private _onLoadComplete(): void {
        this._game.create();
        this._ui.create();
        this._preloader.destroy();
    }

    private readonly _rebuild = (): void => {
        this._preloader?.rebuild();
        this._game?.rebuild();
        this._ui?.rebuild();
    };

    private readonly _resize = (): void => {
        const maxRatio = 0.4;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const realRatio = Math.min(width / height, height / width);
        const aspectRatio = Math.max(maxRatio, realRatio);

        if (height > width) {
            height *= realRatio / aspectRatio;
        } else {
            width *= realRatio / aspectRatio;
        }

        this._bounds.width = width;
        this._bounds.height = height;
        this._orientation = width >= height ? 'landscape' : 'portrait';

        this._element.style.left = `${(window.innerWidth - width) / 2}px`;
        this._element.style.top = `${(window.innerHeight - height) / 2}px`;
        this._element.style.width = `${width}px`;
        this._element.style.height = `${height}px`;

        services.renderer.resize(width, height);

        this._rebuild();
    };
}
