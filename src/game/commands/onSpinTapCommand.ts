import { services } from '../../services';

export const onSpinTapCommand = (): void => {
    const { slotMachine } = services.model;

    // const positions = slotMachine.reels.map(reel => reel.getRandomPosition());
    const positions = [0, 11, 1, 10, 14];
    slotMachine.setPositions(positions);
    slotMachine.calculateResult();
};
