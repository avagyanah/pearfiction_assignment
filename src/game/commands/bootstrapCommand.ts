import { services } from '../../services';
import { SlotMachineModel } from '../model/slotMachineModel';
import { onLoadCompleteCommand } from './onLoadCompleteCommand';
import { onSpinTapCommand } from './onSpinTapCommand';

export const bootstrapCommand = (): void => {
    // Initialize models
    services.model = {
        slotMachine: new SlotMachineModel().initialize(),
    };

    // Map events to commands which are making changes in models
    services.emitter.once('load_complete', onLoadCompleteCommand, this);
    services.emitter.on('spin_tap', onSpinTapCommand);
};
