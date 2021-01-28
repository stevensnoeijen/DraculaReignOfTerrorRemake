import { Vector2 } from './Vector2';

describe('Vector2', () => {
    describe('ZERO', () => {
        test('values', () => {
            expect(Vector2.ZERO.x).toEqual(0);
            expect(Vector2.ZERO.y).toEqual(0);
        })
    });
    describe('constructor', () => {
        test('empty', () => {
            const vector = new Vector2();

            expect(vector.x).toEqual(0);
            expect(vector.y).toEqual(0);
        });
        test('set values', () => {
            const vector = new Vector2({
                x: 100,
                y: 200,
            });

            expect(vector.x).toEqual(100);
            expect(vector.y).toEqual(200);
        });
    });
    describe('magnitude', () => {
        test('simple', () => {
            const vector = new Vector2({
                x: 100,
                y: 0,
            });
            expect(vector.magnitude()).toEqual(100);
        });
        test('simple2', () => {
            const vector = new Vector2({
                x: 100,
                y: 100,
            });
            expect(vector.magnitude()).toBeCloseTo(141.42);
        });
    });
    describe('normalized', () => {
        test('simple', () => {
            const vector = new Vector2({
                x: 3,
                y: 4,
            });
            const normalizedVector = vector.normalized();
            expect(normalizedVector.x).toBeCloseTo(0.6);
            expect(normalizedVector.y).toBeCloseTo(0.8);
        });
    });
    describe('distance', () => {
        test('simple', () => {
            const a = new Vector2({
                x: 1,
                y: 1,
            });
            const b = new Vector2({
                x: 2,
                y: 2,
            });

            expect(Vector2.distance(a, b)).toBeCloseTo(1.41);
        });
    });
    describe('lerp', () => {
        test('simple', () => {
            const a = new Vector2({
                x: 0,
                y: 0,
            });
            const b = new Vector2({
                x: 1,
                y: 0,
            });

            expect(Vector2.lerp(a, b, .5)).toEqual({ x: .5, y: 0 });
        });
    });
    describe('angle', () => {
        test('same location', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 0, y: 0 }))).toEqual(0);
        });
        test('above', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 0, y: -1 }))).toEqual(-90);
        });
        test('above-right', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 1, y: -1 }))).toEqual(-45);
        });
        test('right', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 1, y: 0 }))).toEqual(0);
        });
        test('right-below', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 1, y: 1 }))).toEqual(45);
        });
        test('below', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: 0, y: 1 }))).toEqual(90);
        });
        test('below-left', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: -1, y: 1 }))).toEqual(135);
        });
        test('left', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: -1, y: 0 }))).toEqual(180);
        });
        test('left-above', () => {
            expect(Vector2.angle(new Vector2({ x: 0, y: 0 }), new Vector2({ x: -1, y: -1 }))).toEqual(-135);
        });
    });
});