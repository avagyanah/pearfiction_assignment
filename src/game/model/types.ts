export type TileID = 'hv1' | 'hv2' | 'hv3' | 'hv4' | 'lv1' | 'lv2' | 'lv3' | 'lv4';

export type Band = TileID[];

export interface IManifest {
    reelset: Band[];
}
