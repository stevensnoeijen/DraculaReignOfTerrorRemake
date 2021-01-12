export class Direction {
    /**
     * 
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2
     *  
     * @returns {number} rotation in degrees, where 0 is right
     * 
     * Source: https://stackoverflow.com/a/2676810 and https://www.w3resource.com/javascript-exercises/javascript-math-exercise-34.php
     * 
     */
    public static calculateDirection(x1: number, y1: number, x2: number, y2: number): number {
        return this.radiansToDegrees(Math.atan2(y2 - y1, x2 - x1));
    }

    private static radiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }
}