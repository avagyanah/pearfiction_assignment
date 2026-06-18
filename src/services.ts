import { Renderer, Ticker } from 'pixi.js';
import { IModel } from './game/model/types';
import { Stage } from './game/view/stage';
import { Loader } from './loader';
import { Emitter } from './types';

class ServiceLocator {
    public ticker!: Ticker;
    public renderer!: Renderer;
    public stage!: Stage;
    public loader!: Loader;
    public emitter!: Emitter;
    public model!: IModel;
}

export const services = new ServiceLocator();
