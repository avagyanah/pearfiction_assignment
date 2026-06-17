import { Container } from 'pixi.js';
import { IRect } from '../../libs/grid/types';
import { services } from '../../services';
import { Game } from './game';

type Orientation = 'landscape' | 'portrait';

export class Stage extends Container {
    private _orientation: Orientation;
    private _element: HTMLElement;
    private _bounds: IRect;

    private _game!: Game;

    public constructor() {
        super();

        this._orientation = 'landscape';
        this._bounds = { x: 0, y: 0, width: 1, height: 1 };
        this._element = document.getElementById('game_div') as HTMLElement;

        window.addEventListener('resize', this._resize);
        this._resize();
    }

    public get bounds(): IRect {
        return this._bounds;
    }

    public get orientation(): Orientation {
        return this._orientation;
    }

    public init(): void {
        this._game = new Game();
        this._game.create();
        this._game.updateTransform({});
        this.addChild(this._game);
    }

    private readonly _rebuild = (): void => {
        this._game?.rebuild();
    };

    private readonly _resize = (): void => {
        const ratio = window.devicePixelRatio ?? 1;
        const width = window.innerWidth / ratio;
        const height = window.innerHeight / ratio;

        this._bounds.width = width;
        this._bounds.height = height;
        this._orientation = width >= height ? 'landscape' : 'portrait';

        this._element.style.width = `${width}px`;
        this._element.style.height = `${height}px`;

        services.renderer.resize(width, height);

        this._rebuild();
    };
}
