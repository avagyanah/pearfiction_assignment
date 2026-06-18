import { services } from '../../services';
import { SlotMachineModel } from '../model/slotMachineModel';
import { onSpinTapCommand } from './onSpinTapCommand';

export const bootstrapCommand = (): void => {
    // Initialize models
    services.model = {
        slotMachine: new SlotMachineModel().initialize(),
    };

    // Map events to commands which are making changes in models
    services.emitter.on('spin_tap', onSpinTapCommand);
};
