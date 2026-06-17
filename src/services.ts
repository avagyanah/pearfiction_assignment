import { Renderer, Ticker } from 'pixi.js';
import { Stage } from './game/view/stage';
import { Loader } from './loader';

class ServiceLocator {
    public ticker!: Ticker;
    public renderer!: Renderer;
    public stage!: Stage;
    public loader!: Loader;
}

export const services = new ServiceLocator();
