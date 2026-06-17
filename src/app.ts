import { Renderer, Ticker, autoDetectRenderer } from 'pixi.js';
import { getRendererOptions } from './const';
import { Game } from './game/view/game';
import { Stage } from './game/view/stage';
import { services } from './services';

export class App {
    public ticker!: Ticker;
    public stage!: Stage;
    public renderer!: Renderer;
    public game!: Game;

    constructor() {
        //
    }

    public async init(): Promise<void> {
        this.renderer = services.renderer = await autoDetectRenderer(getRendererOptions());

        this.ticker = services.ticker = Ticker.shared;
        this.ticker.autoStart = false;
        this.ticker.stop();

        this.stage = services.stage = new Stage();
        this.stage.init();
    }

    public async start(): Promise<void> {
        this.ticker.add(this.update);
        this.ticker.start();
    }

    private readonly update = () => {
        this.renderer.render(this.stage);
    };
}
