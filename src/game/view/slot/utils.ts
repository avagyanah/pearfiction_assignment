import { Container, RenderTexture, Sprite, Texture, Ticker } from 'pixi.js';
import { SLOT_CONST } from '../../../const';
import { services } from '../../../services';
import { Band } from '../../model/types';

export const wait = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => {
        const { ticker } = services;
        let elapsed = 0;

        const tick = (t: Ticker): void => {
            elapsed += t.deltaMS;

            if (elapsed >= milliseconds) {
                ticker.remove(tick);
                resolve();
            }
        };

        ticker.add(tick);
    });
};

export const getReelTexture = (band: Band): RenderTexture => {
    const { tileWidth, tileHeight } = SLOT_CONST;

    const strip = new Container();

    for (let i = 0; i < band.length; i++) {
        const tile = new Sprite(Texture.from(band[i]));
        tile.position.set(0, i * tileHeight);
        strip.addChild(tile);
    }

    const texture = RenderTexture.create({
        width: tileWidth,
        height: tileHeight * band.length,
        resolution: 1,
    });

    services.renderer.render({ container: strip, target: texture });
    strip.destroy({ children: true });

    return texture;
};
