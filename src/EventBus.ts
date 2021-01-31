
type EventListener<Event> = (event: CustomEvent<Event>) => void;

/**
 * Source: https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/
 */
export class EventBus<Event> {
    private static counter = 0;
    private readonly eventTarget: EventTarget;

    constructor(name?: string) {
        name = name || '' + ++EventBus.counter;
        this.eventTarget = document.appendChild(document.createComment('EventBus: ' + name));
    }
    public on(type: string, listener: EventListener<Event>): void {
        this.eventTarget.addEventListener(type, listener);
    }

    public once(type: string, listener: EventListener<Event>): void {
        this.eventTarget.addEventListener(type, listener, { once: true });
    }

    public off(type: string, listener: EventListener<Event>): void {
        this.eventTarget.removeEventListener(type, listener);
    }

    public emit(type: string, detail?: Event): boolean {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
    }
}