type CustomEventListener<Event> = (event: CustomEvent<Event>) => void;

/**
 * Source: https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/
 */
export class EventBus<TEvents> {
	private static counter = 0;
	private readonly eventTarget: EventTarget;

	constructor(name?: string) {
		name = name || '' + ++EventBus.counter;
		this.eventTarget = document.appendChild(
			document.createComment('EventBus: ' + name)
		);
	}
	public on<TEvent extends TEvents>(type: string, listener: CustomEventListener<TEvent>): void {
		this.eventTarget.addEventListener(type, listener as EventListener);
	}

	public once<TEvent extends TEvents>(type: string, listener: CustomEventListener<TEvent>): void {
		this.eventTarget.addEventListener(type, listener as EventListener, {
			once: true,
		});
	}

	public off<TEvent extends TEvents>(type: string, listener: CustomEventListener<TEvent>): void {
		this.eventTarget.removeEventListener(type, listener as EventListener);
	}

	public emit<TEvent extends TEvents>(type: string, detail?: TEvent): boolean {
		return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
	}
}
