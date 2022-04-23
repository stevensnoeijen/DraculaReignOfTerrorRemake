type CustomEventListener<Detail> = (event: CustomEvent<Detail>) => void;

/**
 * Source: https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/
 */
export class EventBus<DetailOptions> {
	private static counter = 0;
	private readonly eventTarget: EventTarget;

	constructor(name?: string) {
		name = name || '' + ++EventBus.counter;
		this.eventTarget = document.appendChild(
			document.createComment('EventBus: ' + name)
		);
	}
	public on<Detail extends DetailOptions>(type: string, listener: CustomEventListener<Detail>): void {
		this.eventTarget.addEventListener(type, listener as EventListener);
	}

	public once<Detail extends DetailOptions>(type: string, listener: CustomEventListener<Detail>): void {
		this.eventTarget.addEventListener(type, listener as EventListener, {
			once: true,
		});
	}

	public off<Detail extends DetailOptions>(type: string, listener: CustomEventListener<Detail>): void {
		this.eventTarget.removeEventListener(type, listener as EventListener);
	}

	public emit<Detail extends DetailOptions>(type: string, detail?: Detail): boolean {
		return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
	}
}
