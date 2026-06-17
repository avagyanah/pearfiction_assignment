import {
    GridCellAlign,
    GridCellScale,
    ICell,
    ICellConfig,
    ICellContent,
    IPoint,
    IRect,
} from './types';
import { GridPoint, GridRect } from './utils';

export class Cell implements ICell {
    public readonly name!: string;
    public readonly contents!: ICellContent[];

    private _area!: IRect;
    private _bounds!: IRect;
    private _scale!: GridCellScale;
    private _align!: GridCellAlign;

    public constructor(name: string) {
        this.name = name;
        this.contents = [];
    }

    public get area(): IRect {
        return this._area;
    }

    public get bounds(): IRect {
        return this._bounds;
    }

    public get scale(): GridCellScale {
        return this._scale;
    }

    public get align(): GridCellAlign {
        return this._align;
    }

    public init(config: ICellConfig, area: IRect): ICell {
        const { bounds, padding, offset, scale, align } = config;

        this._bounds = this._getBounds(bounds, offset, area);
        this._area = this._getArea(padding);
        this._scale = this._getScale(scale);
        this._align = this._getAlign(align);

        return this;
    }

    public addContent(content: ICellContent): void {
        this.contents.push(content);
    }

    public removeContent(content: ICellContent): void {
        this.contents.splice(this.contents.indexOf(content), 1);
    }

    private _getBounds(bounds: IRect, offset: IPoint = new GridPoint(0, 0), area: IRect): GridRect {
        const { x: ax, y: ay, width: aw, height: ah } = area;
        const { x: bx, y: by, width: bw, height: bh } = bounds;
        const { x: ox, y: oy } = offset;

        const x = ax + bx * aw + ox;
        const y = ay + by * ah + oy;
        const w = bw * aw;
        const h = bh * ah;

        return new GridRect(x, y, w, h);
    }

    private _getArea(padding: IRect = new GridRect(0, 0, 1, 1)): GridRect {
        const { x: bx, y: by, width: bw, height: bh } = this._bounds;
        const { x: px, y: py, width: pw, height: ph } = padding;

        const x = bx + px * bw;
        const y = by + py * bh;
        const w = bw - (1 - pw) * bw;
        const h = bh - (1 - ph) * bh;

        return new GridRect(x, y, w, h);
    }

    private _getScale(scale = GridCellScale.fit): GridCellScale {
        return scale;
    }

    private _getAlign(align = GridCellAlign.center): GridCellAlign {
        return align;
    }
}
