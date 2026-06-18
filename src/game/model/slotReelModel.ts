import { Band, TileID } from './types';

export class SlotReelModel {
    private _band: Band = [];
    private _position: number = 0;

    public constructor(band: Band, position: number) {
        this.setBand(band);
        this.setPosition(position);
    }

    public setBand(band: Band): void {
        this._band = band;
    }

    public setPosition(position: number): void {
        this._position = position;
    }

    public getRandomPosition(): number {
        return Math.floor(Math.random() * this._band.length);
    }

    public get band(): TileID[] {
        return this._band;
    }

    public get position(): number {
        return this._position;
    }
}
