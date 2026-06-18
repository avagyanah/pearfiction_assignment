import { services } from '../../services';
import { SlotMachineModel } from '../model/slotMachineModel';

export const initializeModelsCommand = (): void => {
    services.model = {
        slotMachine: new SlotMachineModel().initialize(),
    };
};
