import { EventEmitter } from 'eventemitter3';
import { Renderer, Ticker, autoDetectRenderer } from 'pixi.js';
import { getRendererOptions } from './const';
import { bootstrapCommand } from './game/commands/bootstrapCommand';
import { Stage } from './game/view/stage';
import { Loader } from './loader';
import { services } from './services';
import { Emitter } from './types';

export class App {
    public ticker!: Ticker;
    public stage!: Stage;
    public loader!: Loader;
    public renderer!: Renderer;
    public emitter!: Emitter;

    constructor() {
        //
    }

    public async init(): Promise<void> {
        this.emitter = services.emitter = new EventEmitter();

        this.renderer = services.renderer = await autoDetectRenderer(getRendererOptions());

        this.ticker = services.ticker = Ticker.shared;
        this.ticker.autoStart = false;
        this.ticker.stop();

        this.stage = services.stage = new Stage();
        this.stage.init();

        this.loader = services.loader = new Loader();

        bootstrapCommand();
    }

    public async load(): Promise<void> {
        await this.loader.loadAssets();
    }

    public async start(): Promise<void> {
        this.ticker.add(this.update);
        this.ticker.start();
    }

    private readonly update = () => {
        this.renderer.render(this.stage);
    };
}
