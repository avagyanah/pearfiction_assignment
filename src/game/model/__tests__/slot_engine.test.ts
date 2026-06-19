import { MathEngine } from '../mathEngine';
import manifest from '../slot_manifest.json';
import { IManifest } from '../types';

const engine = new MathEngine(manifest as IManifest);

describe('MathEngine', () => {
    it('returns total win of 1 and payline 3 lv3 x3 for positions [0, 0, 0, 0, 0]', () => {
        const result = engine.calculate([0, 0, 0, 0, 0]);

        expect(result.totalWin).toBe(1);
        expect(result.wins).toHaveLength(1);
        expect(result.wins[0]).toMatchObject({
            paylineId: 3,
            symbol: 'lv3',
            count: 3,
            payout: 1,
        });
    });

    it('returns total win of 6 with payline 2 and 5 for positions [0, 11, 1, 10, 14]', () => {
        const result = engine.calculate([0, 11, 1, 10, 14]);

        expect(result.totalWin).toBe(6);
        expect(result.wins).toHaveLength(2);
        expect(result.wins[0]).toMatchObject({ paylineId: 2, symbol: 'hv2', count: 3, payout: 5 });
        expect(result.wins[1]).toMatchObject({ paylineId: 5, symbol: 'lv3', count: 3, payout: 1 });
    });

    it('returns total win of 5 with payline 6 only for positions [5, 14, 9, 9, 16]', () => {
        const result = engine.calculate([5, 14, 9, 9, 16]);

        expect(result.totalWin).toBe(5);
        expect(result.wins).toHaveLength(1);
        expect(result.wins[0]).toMatchObject({ paylineId: 6, symbol: 'lv1', count: 4, payout: 5 });
    });

    it('returns total win of 0 for positions [1, 16, 2, 15, 0]', () => {
        const result = engine.calculate([1, 16, 2, 15, 0]);

        expect(result.totalWin).toBe(0);
        expect(result.wins).toHaveLength(0);
    });

    it('returns hv1 x5 payout of 50 on payline 1 for positions [2, 13, 11, 8, 4]', () => {
        const result = engine.calculate([2, 13, 11, 8, 4]);

        expect(result.totalWin).toBe(50);
        expect(result.wins).toHaveLength(1);
        expect(result.wins[0]).toMatchObject({ paylineId: 1, symbol: 'hv1', count: 5, payout: 50 });
    });

    it('returns total win of 0 for positions [18, 9, 2, 0, 12]', () => {
        const result = engine.calculate([18, 9, 2, 0, 12]);

        expect(result.totalWin).toBe(0);
        expect(result.wins).toHaveLength(0);
    });

    it('wraps correctly when position + row crosses band boundary', () => {
        const wrappingManifest: IManifest = {
            reelset: Array(5).fill(['hv1', 'lv1', 'lv1', 'lv1']),
            paytable: {
                hv1: [10, 20, 50],
                hv2: [5, 10, 20],
                hv3: [5, 10, 15],
                hv4: [5, 10, 15],
                lv1: [2, 5, 10],
                lv2: [1, 2, 5],
                lv3: [1, 2, 3],
                lv4: [1, 2, 3],
            },
            paylines: [
                [
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                ],
            ],
            initialPositions: [0, 0, 0, 0, 0],
        };

        const wrappingEngine = new MathEngine(wrappingManifest);

        // position 3 is the last index; row 1 wraps to band[0] = hv1 on all 5 reels
        const result = wrappingEngine.calculate([3, 3, 3, 3, 3]);

        expect(result.totalWin).toBe(50);
        expect(result.wins).toHaveLength(1);
        expect(result.wins[0]).toMatchObject({ paylineId: 1, symbol: 'hv1', count: 5, payout: 50 });
    });

    it('works with custom manifest and evaluates multiple simultaneous wins', () => {
        const customManifest: IManifest = {
            reelset: [
                ['hv1', 'lv1', 'hv1'],
                ['hv1', 'lv1', 'hv1'],
                ['hv1', 'lv1', 'hv1'],
                ['hv1', 'lv1', 'hv2'],
                ['hv1', 'lv1', 'hv2'],
            ],
            paytable: {
                hv1: [10, 20, 50],
                hv2: [5, 10, 20],
                hv3: [5, 10, 15],
                hv4: [5, 10, 15],
                lv1: [2, 5, 10],
                lv2: [1, 2, 5],
                lv3: [1, 2, 3],
                lv4: [1, 2, 3],
            },
            paylines: [
                [
                    [1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ],
                [
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                ],
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                ],
            ],
            initialPositions: [0, 0, 0, 0, 0],
        };

        const customEngine = new MathEngine(customManifest);

        const result = customEngine.calculate([0, 0, 0, 0, 0]);

        expect(result.totalWin).toBe(70); // 50 for 5 x hv1, 10 for 5 x lv1, 10 for 3 x hv1
        expect(result.wins).toHaveLength(3);
        expect(result.wins[0]).toMatchObject({ paylineId: 1, symbol: 'hv1', count: 5, payout: 50 });
        expect(result.wins[1]).toMatchObject({ paylineId: 2, symbol: 'lv1', count: 5, payout: 10 });
        expect(result.wins[2]).toMatchObject({ paylineId: 3, symbol: 'hv1', count: 3, payout: 10 });
    });
});
