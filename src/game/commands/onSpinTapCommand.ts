import { services } from '../../services';

export const onSpinTapCommands = (): void => {
    const { slotMachine } = services.model;

    // const result = slotMachine.reels.map(reel => reel.getRandomPosition());
    const result = [0, 11, 1, 10, 14];
    slotMachine.setResult(result);
};
