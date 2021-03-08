type CustomEventListener<Event> = (event: CustomEvent<Event>) => void;

/**
 * Source: https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/
 */
export class EventBus<Event> {
	private static counter = 0;
	private readonly eventTarget: EventTarget;

	constructor(name?: string) {
		name = name || '' + ++EventBus.counter;
		this.eventTarget = document.appendChild(
			document.createComment('EventBus: ' + name)
		);
	}
	public on(type: string, listener: CustomEventListener<Event>): void {
		this.eventTarget.addEventListener(type, listener as EventListener);
	}

	public once(type: string, listener: CustomEventListener<Event>): void {
		this.eventTarget.addEventListener(type, listener as EventListener, {
			once: true,
		});
	}

	public off(type: string, listener: CustomEventListener<Event>): void {
		this.eventTarget.removeEventListener(type, listener as EventListener);
	}

	public emit(type: string, detail?: CustomEventInit): boolean {
		return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
	}
}
