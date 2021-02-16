export class Input {
    private static keyEvents: KeyboardEvent[] = [];

    public static addKeyEvents(keyEvents: KeyboardEvent[]): void {
        this.keyEvents.push(...keyEvents);
    }

    public static clearKeyEvents(): void {
        this.keyEvents = [];
    }

    private static isKey(key: string, type: string): boolean {
        return undefined !== this.keyEvents.find((event) => event.key === key && type === event.type);
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