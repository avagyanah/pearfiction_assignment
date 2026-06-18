import EventEmitter from 'eventemitter3';
import { IWinResult } from './game/model/types';

export type Emitter = EventEmitter<{
    load_progress: [number];
    load_complete: [];
    spin_tap: [];
    positions_update: [];
    result_update: [IWinResult];
}>;
