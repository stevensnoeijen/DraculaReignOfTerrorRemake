export type KeyType = 'keydown' | 'keypress' | 'keyup';
type KeysStatus = { [key: string]: KeyType | undefined };

export class Input {
    private static keysStatus: KeysStatus = {};

    public static addKeyStatus(key: string, type: KeyType): void {
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

    private static isKey(key: string, type: KeyType): boolean {
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
}