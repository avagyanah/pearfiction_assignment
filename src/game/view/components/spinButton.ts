import { Sprite, Texture } from 'pixi.js';
import { services } from '../../../services';

export class SpinButton extends Sprite {
    public constructor() {
        super({
            texture: Texture.from('spin_button'),
            label: 'SpinButton',
        });

        this.anchor.set(0.5);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointertap', this._handleTap);
    }

    private readonly _handleTap = (): void => {
        services.emitter.emit('spin_tap');
    };
}
