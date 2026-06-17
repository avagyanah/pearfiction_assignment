import type { DestroyOptions } from 'pixi.js';
import { Container } from 'pixi.js';

import { Cell } from './cell';
import {
    GridCellScale,
    ICell,
    ICellConfig,
    ICellContent,
    IGrid,
    IGridConfig,
    IRect,
} from './types';
import { align, fit, GridRect } from './utils';

export abstract class Grid extends Container implements IGrid {
    private readonly _cells: ICell[];
    private readonly _area: GridRect;

    public constructor(config?: IGridConfig) {
        super();

        const { area, cells } = config ?? this.getGridConfig();
        this._cells = this._buildCells(cells);
        this._area = this._buildArea(area);

        this.rebuild(config);
    }

    public get cells(): ICell[] {
        return this._cells;
    }

    public get area(): GridRect {
        return this._area;
    }

    public getCell(cellId: string): ICell | undefined {
        return this._cells.find(cell => cell.name === cellId);
    }

    public destroy(options?: DestroyOptions): void {
        super.destroy(options);

        this._cells.length = 0;
    }

    public rebuild(config?: IGridConfig): void {
        if (this.destroyed) {
            return;
        }

        const { area, cells } = config ?? this.getGridConfig();

        /* area */
        this._area.copyFrom(area);

        /* cells */
        cells.forEach(cellConfig => {
            const cell = this.getCell(cellConfig.name)!;
            cell.init(cellConfig, area);
            cell.contents.forEach(content => {
                this._rebuildContent(cell, content);
            });
        });
    }

    public reattach(cellName: string, content: ICellContent, addChild = true): void {
        const currentCell = this.cells.find(cell => cell.contents.includes(content));
        if (currentCell) {
            this.detach(currentCell.name, content);
        }
        this.attach(cellName, content, addChild);
    }

    public attach(cellName: string, content: ICellContent, addChild = true): void {
        if (addChild) {
            this.addChild(content);
        }

        const cell = this.getCell(cellName);
        if (cell == null) {
            throw new Error(`No cell found with name ${cellName}`);
        }

        content.once('destroyed', () => this.detach(cellName, content));

        cell.addContent(content);
        this._rebuildContent(cell, content);
    }

    public detach(cellName: string, content: ICellContent): void {
        const cell = this.getCell(cellName)!;

        if (!cell.contents.find(c => c === content)) {
            throw new Error('No cell found with specified content');
        }

        cell.removeContent(content);
        content.off('destroyed');
    }

    private _rebuildContent(cell: ICell, content: ICellContent): void {
        /* reset content */
        this._resetContent(cell, content);

        /* adjust content */
        const bounds = content.getLocalBounds();
        this._scaleContent(cell, content, bounds);
        this._alignContent(cell, content, bounds);
    }

    private _resetContent(cell: ICell, content: ICellContent): void {
        content.position.set(0, 0);

        if (cell.scale !== GridCellScale.none) {
            content.scale.set(1, 1);
        }
    }

    private _scaleContent(cell: ICell, content: ICellContent, bounds: IRect): void {
        switch (cell.scale) {
            case GridCellScale.none: {
                //
                break;
            }
            case GridCellScale.custom: {
                if (content.resize == null) {
                    throw new Error('resize() function does not implemented');
                }
                content.resize(cell.area.width, cell.area.height);
                content.updateLocalTransform();
                break;
            }
            default: {
                const worldScaleX = content.worldTransform.a / content.localTransform.a;
                const worldScaleY = content.worldTransform.d / content.localTransform.d;
                const contentDimensions = {
                    width: bounds.width / worldScaleX,
                    height: bounds.height / worldScaleY,
                };

                const scale = fit(contentDimensions, cell.area, cell.scale);
                content.scale.set(scale.x, scale.y);
            }
        }
    }

    private _alignContent(cell: ICell, content: ICellContent, bounds: IRect): void {
        const worldScaleX = content.worldTransform.a / content.localTransform.a;
        const worldScaleY = content.worldTransform.d / content.localTransform.d;
        const contentDimensions = {
            width: (bounds.width / worldScaleX) * content.scale.x,
            height: (bounds.height / worldScaleY) * content.scale.y,
        };
        const pos = align(contentDimensions, cell.area, cell.align);
        content.position.set(pos.x, pos.y);
        content.x -= (bounds.x / worldScaleX) * content.scale.x;
        content.y -= (bounds.y / worldScaleY) * content.scale.y;
    }

    private _buildArea(rawArea: IRect): GridRect {
        return new GridRect().copyFrom(rawArea);
    }

    private _buildCells(rawCells: ICellConfig[]): ICell[] {
        const cells: ICell[] = new Array(rawCells.length);

        rawCells.forEach((cell, i) => (cells[i] = new Cell(cell.name)));

        return cells;
    }

    public abstract getGridConfig(): IGridConfig;
    // public abstract init(): void;
}
