import { services } from '../../services';

export const setReelsInitialStateCommand = (): void => {
    const { slotMachine } = services.model;

    slotMachine.setInitialPositions();
};
