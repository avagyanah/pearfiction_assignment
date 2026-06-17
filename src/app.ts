import { Renderer, Ticker, autoDetectRenderer } from 'pixi.js';
import { getRendererOptions } from './const';
import { Stage } from './game/view/stage';
import { Loader } from './loader';
import { services } from './services';

export class App {
    public ticker!: Ticker;
    public stage!: Stage;
    public loader!: Loader;
    public renderer!: Renderer;

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

        this.loader = services.loader = new Loader();
    }

    public async load(): Promise<void> {
        await this.loader.loadAssets(this.stage.onLoadProgress, this.stage.onLoadComplete);
    }

    public async start(): Promise<void> {
        this.ticker.add(this.update);
        this.ticker.start();
    }

    private readonly update = () => {
        this.renderer.render(this.stage);
    };
}
