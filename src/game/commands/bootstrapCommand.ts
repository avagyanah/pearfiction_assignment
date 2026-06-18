import { services } from '../../services';
import { initializeModelsCommand } from './initializeModelCommand';
import { onSpinTapCommands } from './onSpinTapCommand';

export const bootstrapCommands = (): void => {
    initializeModelsCommand();

    services.emitter.on('spin_tap', onSpinTapCommands);
};
