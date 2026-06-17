import { Renderer, Ticker } from 'pixi.js';
import { Stage } from './game/view/stage';

class ServiceLocator {
    public ticker!: Ticker;
    public renderer!: Renderer;
    public stage!: Stage;
}

export const services = new ServiceLocator();
