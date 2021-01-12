import { Direction } from './Direction';

describe('Direction', () => {
    describe('calculateDirection', () => {
        test('same location', () => {
            expect(Direction.calculateDirection(0, 0, 0, 0)).toEqual(0);
        });
        test('above', () => {
            expect(Direction.calculateDirection(0, 0, 0, -1)).toEqual(-90);
        });
        test('above-right', () => {
            expect(Direction.calculateDirection(0, 0, 1, -1)).toEqual(-45);
        });
        test('right', () => {
            expect(Direction.calculateDirection(0, 0, 1, 0)).toEqual(0);
        });
        test('right-below', () => {
            expect(Direction.calculateDirection(0, 0, 1, 1)).toEqual(45);
        });
        test('below', () => {
            expect(Direction.calculateDirection(0, 0, 0, 1)).toEqual(90);
        });
        test('below-left', () => {
            expect(Direction.calculateDirection(0, 0, -1, 1)).toEqual(135);
        });
        test('left', () => {
            expect(Direction.calculateDirection(0, 0, -1, 0)).toEqual(180);
        });
        test('left-above', () => {
            expect(Direction.calculateDirection(0, 0, -1, -1)).toEqual(-135);
        });
    })
});