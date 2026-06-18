import { Sprite, Texture } from 'pixi.js';

export class SpinButton extends Sprite {
    public constructor() {
        super({
            texture: Texture.from('spin_button'),
        });

        this.anchor.set(0.5);
    }
}
