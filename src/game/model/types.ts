import { SlotMachineModel } from './slotMachineModel';

export interface IModel {
    slotMachine: SlotMachineModel;
}

export type TileID = 'hv1' | 'hv2' | 'hv3' | 'hv4' | 'lv1' | 'lv2' | 'lv3' | 'lv4';

export type Band = TileID[];

export type Paytable = Record<TileID, [number, number, number]>;

export interface IManifest {
    paytable: Paytable;
    reelset: Band[];
    paylines: number[][][];
    initialPositions: number[];
}

export type TileMatrix = TileID[][];

export interface IWinLine {
    paylineId: number;
    symbol: TileID;
    count: number;
    payout: number;
}

export interface IWinResult {
    totalWin: number;
    wins: IWinLine[];
}
