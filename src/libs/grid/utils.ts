import { GridCellAlign, GridCellScale, IDimension, IPoint, IRect } from './types';

export class GridPoint implements IPoint {
    public constructor(
        public x = 0,
        public y = 0
    ) {
        //
    }

    public static rotate(pt: IPoint, around: IPoint, angle: number): IPoint {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const tx = pt.x - around.x;
        const ty = pt.y - around.y;

        return { x: tx * cos - ty * sin + around.x, y: tx * sin + ty * cos + around.y };
    }

    public static normalize(pt: IPoint): IPoint {
        const hypot = Math.hypot(pt.x, pt.y);

        return { x: pt.x / hypot, y: pt.y / hypot };
    }

    public static dot(pt1: IPoint, pt2: IPoint): number {
        return pt1.x * pt2.x + pt1.y * pt2.y;
    }

    public static det(pt1: IPoint, pt2: IPoint): number {
        return pt1.x * pt2.x - pt1.y * pt2.y;
    }

    public static add(pt1: IPoint, pt2: IPoint): IPoint {
        return { x: pt1.x + pt2.x, y: pt1.y + pt2.y };
    }

    public static subtract(pt1: IPoint, pt2: IPoint): IPoint {
        return { x: pt1.x - pt2.x, y: pt1.y - pt2.y };
    }

    public static scalar(pt: IPoint, multiplier: number): IPoint {
        return { x: pt.x * multiplier, y: pt.y * multiplier };
    }

    public static hypot(pt: IPoint): number {
        return Math.hypot(pt.x, pt.y);
    }

    public static distance(from: IPoint, to: IPoint): number {
        return Math.hypot(to.x - from.x, to.y - from.y);
    }

    public static angle(from: IPoint, to: IPoint): number {
        return Math.atan2(to.y - from.y, to.x - from.x);
    }

    public static getPointOn(from: IPoint, to: IPoint, fraction: number): IPoint {
        const angle = GridPoint.angle(from, to);
        const distance = GridPoint.distance(from, to);

        return {
            x: from.x + Math.cos(angle) * distance * fraction,
            y: from.y + Math.sin(angle) * distance * fraction,
        };
    }

    public static isZero(pt: IPoint): boolean {
        return pt.x === 0 && pt.y === 0;
    }

    public static moveBy(pt: IPoint, angle: number, distance: number): IPoint {
        return { x: pt.x + Math.cos(angle) * distance, y: pt.y + Math.sin(angle) * distance };
    }

    public static limit(pt: IPoint, length: number): IPoint {
        const result = new GridPoint(pt.x, pt.y);
        const hypot = Math.hypot(pt.x, pt.y);

        return hypot <= length ? result : GridPoint.scalar(result, length / hypot);
    }

    public set(x: number, y = x): GridPoint {
        this.x = x;
        this.y = y;

        return this;
    }

    public copyFrom({ x, y }: IPoint): GridPoint {
        this.set(x, y);

        return this;
    }
}

export class GridRect implements IRect {
    public constructor(
        public x = 0,
        public y = 0,
        public width = 0,
        public height = 0
    ) {
        //
    }

    public set(x: number, y: number, width: number, height: number): GridRect {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    }

    public copyFrom({ x, y, width, height }: IRect): GridRect {
        this.set(x, y, width, height);

        return this;
    }

    public contains(x: number, y: number): boolean {
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
}

export function align(dimension: IDimension, rect: IRect, alignType: GridCellAlign): GridPoint {
    const { width: w1, height: h1 } = dimension;
    const { x: x2, y: y2, width: w2, height: h2 } = rect;
    const pos = new GridPoint(x2, y2);

    switch (alignType) {
        case GridCellAlign.center:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1) / 2);
        case GridCellAlign.centerTop:
            return pos.set(x2 + (w2 - w1) / 2, y2);
        case GridCellAlign.centerBottom:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1));
        case GridCellAlign.leftCenter:
            return pos.set(x2, y2 + (h2 - h1) / 2);
        case GridCellAlign.leftTop:
            return pos;
        case GridCellAlign.leftBottom:
            return pos.set(x2, y2 + (h2 - h1));
        case GridCellAlign.rightCenter:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1) / 2);
        case GridCellAlign.rightTop:
            return pos.set(x2 + (w2 - w1), y2);
        case GridCellAlign.rightBottom:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1));
        case GridCellAlign.none:
            return pos;
        default:
            throw new Error(`Unknown align: ${align}`);
    }
}

export function fit(d1: IDimension, d2: IDimension, scaleType: GridCellScale): GridPoint {
    switch (scaleType) {
        case GridCellScale.fit:
            return internalFit(d1, d2);
        case GridCellScale.fill:
            return internalFill(d1, d2);
        case GridCellScale.showAll:
            return internalShowAll(d1, d2);
        case GridCellScale.envelop:
            return internalEnvelop(d1, d2);
        case GridCellScale.none:
            return new GridPoint(1, 1);
        default:
            throw new Error(`Unknown scale type: ${scaleType}`);
    }
}

function internalFit(d1: IDimension, d2: IDimension): GridPoint {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.min(w2 / w1, h2 / h1);

    return s < 1 ? new GridPoint(s, s) : new GridPoint(1, 1);
}

function internalShowAll(d1: IDimension, d2: IDimension): GridPoint {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.min(w2 / w1, h2 / h1);

    return new GridPoint(s, s);
}

function internalEnvelop(d1: IDimension, d2: IDimension): GridPoint {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.max(w2 / w1, h2 / h1);

    return new GridPoint(s, s);
}

function internalFill(d1: IDimension, d2: IDimension): GridPoint {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;

    return new GridPoint(w2 / w1, h2 / h1);
}
