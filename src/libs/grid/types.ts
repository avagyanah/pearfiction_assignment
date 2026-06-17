import type { ColorSource, Container, FillInput } from 'pixi.js';

export type ICellContent = Container & {
    resize?: (width: number, height: number) => void;
    preBuild?: () => void;
    postBuild?: () => void;
};

export interface IGridConfig {
    area: IRect;
    cells: ICellConfig[];
}

export interface ICellConfig {
    name: string;
    bounds: IRect;
    padding?: IRect;
    offset?: IPoint;
    scale?: GridCellScale;
    align?: GridCellAlign;
}

export interface ICellDebugConfig {
    color?: ColorSource;
    fill?: FillInput;
}

export interface ICell {
    name: string;
    area: IRect;
    bounds: IRect;
    scale: GridCellScale;
    align: GridCellAlign;
    contents: ICellContent[];
    init: (cellConfig: ICellConfig, area: IRect) => ICell;
    addContent: (content: ICellContent) => void;
    removeContent: (content: ICellContent) => void;
}

export interface IGrid {
    area: IRect;
    cells: ICell[];
    getGridConfig: () => IGridConfig;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IDimension {
    width: number;
    height: number;
}

export enum GridCellScale {
    none = 1,
    fit,
    fill,
    showAll,
    envelop,
    custom,
}

export enum GridCellAlign {
    none = 1,
    center,
    centerTop,
    centerBottom,
    leftCenter,
    leftTop,
    leftBottom,
    rightCenter,
    rightTop,
    rightBottom,
}
