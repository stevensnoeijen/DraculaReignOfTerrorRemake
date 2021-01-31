import { Grid } from './Grid';
import { Vector2 } from './math/Vector2';

describe('Grid', () => {
    describe('constructor', () => {
        test('empty content', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(grid.width).toEqual(10);
            expect(grid.height).toEqual(10);
            expect(grid.cellSize).toEqual(16);
        });
    });
    describe('getWorldPosition', () => {
        test('simple', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(grid.getWorldPosition(0, 0)).toEqual({ x: 0, y: 0 });
            expect(grid.getWorldPosition(5, 2)).toEqual({ x: 5 * 16, y: 2 * 16 });
        });
        test('offset origin', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 10,
                    y: 10,
                })
            });

            expect(grid.getWorldPosition(0, 0)).toEqual({ x: 10, y: 10 });
            expect(grid.getWorldPosition(5, 2)).toEqual({ x: 10 + 5 * 16, y: 10 + 2 * 16 });
        });
    });
    describe('setValue', () => {
        test('simple', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });
            grid.setValue(0, 0, 1);
        });
        test('worldPosition', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            grid.setValue(new Vector2({
                x: 0,
                y: 0,
            }), 1);
            expect(grid.getValue(0, 0)).toEqual(1);
        });
        test('worldPosition with offset', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 10,
                    y: 10,
                })
            });

            grid.setValue(new Vector2({
                x: 10,
                y: 10,
            }), 1);
            expect(grid.getValue(0, 0)).toEqual(1);
        });
        test('float positions', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(() => {
                grid.setValue(0.5, 0.5, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(0, 0.5, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(0.5, 0, 0);
            }).toThrow();
        });
        test('negative positions', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(() => {
                grid.setValue(-1, 0, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(0, -1, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(-1, -1, 0);
            }).toThrow();
        });
        test('larger than grid positions', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(() => {
                grid.setValue(11, 0, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(0, 12, 0);
            }).toThrow();
            expect(() => {
                grid.setValue(9, 10, 0);
            }).toThrow();
        });
    });
    describe('getValue', () => {
        test('simple', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(grid.getValue(0, 0)).toEqual(0);
        });
        test('negative positions', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(() => {
                grid.getValue(-1, 0);
            }).toThrow();
            expect(() => {
                grid.getValue(0, -1);
            }).toThrow();
            expect(() => {
                grid.getValue(-1, -1);
            }).toThrow();
        });
        test('larger than grid positions', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(() => {
                grid.getValue(10, 0);
            }).toThrow();
            expect(() => {
                grid.getValue(0, 12);
            }).toThrow();
            expect(() => {
                grid.getValue(10, 10);
            }).toThrow();
        });
        test('worldPosition', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 0,
                    y: 0,
                })
            });

            expect(grid.getValue(new Vector2({
                x: 0,
                y: 0,
            }))).toEqual(0);
        });
        test('worldPosition with offset', () => {
            const grid = new Grid({
                width: 10,
                height: 10,
                cellSize: 16,
                originPosition: new Vector2({
                    x: 10,
                    y: 10,
                })
            });

            expect(grid.getValue(new Vector2({
                x: 10,
                y: 10,
            }))).toEqual(0);
        });
    });
});