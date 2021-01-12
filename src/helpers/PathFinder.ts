
export type GridPosition = {
    x: number;
    y: number;
}

export type Grid = number[][];

export type Path = GridPosition[];

export class PathFinder {
    public static findPath(grid: Grid, start: GridPosition, destination: GridPosition): Path {
        const path: GridPosition[] = [];

        const xDiff = destination.x - start.x;
        const yDiff = destination.y - start.y;

        let current = { ...start };
        // first horizontal
        if (xDiff > 0) {
            // move right
            let turn = 0;
            while (turn < xDiff) {
                current = { ...current }
                current.x += 1;
                path.push(current);

                turn++;
            }
        }
        if (xDiff < 0) {
            // move left
            let turn = 0;
            while (turn > xDiff) {
                current = { ...current }
                current.x -= 1;
                path.push(current);

                turn--;
            }
        }

        // then vertical
        if (yDiff > 0) {
            // move up
            let turn = 0;
            while (turn < yDiff) {
                current = { ...current }
                current.y += 1;
                path.push(current);

                turn++;
            }
        }
        if (yDiff < 0) {
            // move down
            let turn = 0;
            while (turn > yDiff) {
                current = { ...current }
                current.y -= 1;
                path.push(current);

                turn--;
            }
        }

        return path;
    }
}