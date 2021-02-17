import { Vector2 } from '../math/Vector2';

export type KeyStatus = 'keydown' | 'keypress' | 'keyup';
type KeysStatus = { [key: string]: KeyStatus | undefined };
export type MouseStatus = 'down' | 'up' | undefined;
type MouseStatuses = { [button: number]: MouseStatus };


export class Input {
    private static keysStatus: KeysStatus = {};
    public static mousePosition: Vector2 = Vector2.ZERO;
    public static mouseStatuses: MouseStatuses = {};// FIXME: clickup clear

    public static addKeyStatus(key: string, type: KeyStatus): void {
        this.keysStatus[key] = type;
    }

    /**
     * Cleans up key statussen that should be cleaned after a frame.
     */
    public static clearKeysStatus(): void {
        for (const key of Object.keys(this.keysStatus)) {
            if (this.keysStatus[key] === 'keyup') {
                this.keysStatus[key] = undefined;
            }
        }
    }

    public static clearMouseStatuses(): void {
        this.mouseStatuses = {};
    }

    private static isKey(key: string, type: KeyStatus): boolean {
        return this.keysStatus[key] === type;
    }

    public static isKeyPressed(key: string): boolean {
        return this.isKey(key, 'keypress');
    }

    public static isKeyDown(key: string): boolean {
        return this.isKey(key, 'keydown');
    }

    public static isKeyUp(key: string): boolean {
        return this.isKey(key, 'keyup');
    }

    public static isMouseButtonUp(button: number): boolean {
        return this.mouseStatuses[button] === 'up';
    }

    public static isMouseButtonDown(button: number): boolean {
        return this.mouseStatuses[button] === 'down';
    }
}