import EventEmitter from 'eventemitter3';

export type Emitter = EventEmitter<{
    load_progress: [number];
    load_complete: [];
    spin_tap: [];
    result_update: [];
}>;
