type EventTypes = 'leftmouseclick' | 'leftmousedragstart' | 'leftmousedragmove' | 'leftmousedragend' | 'rightmouseclick' | 'leftmousedoubleclick';

// overriding default MouseEvent to add own types
class CustomMouseEvent extends MouseEvent {
    constructor(type: EventTypes, eventInitDict?: MouseEventInit | undefined) {
        super(type, eventInitDict);
    }
}

interface EventListener {
    (evt: Event | MouseEvent): void;
}

interface EventListenerObject {
    handleEvent(evt: Event | MouseEvent): void;
}

type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

/**
 * Convert mouse events to usable mouse-events for the game.
 */
export class MouseEventAdapter {
    /**
     * in ms
     */
    private static readonly DOUBLECLICK_TIMEOUT = 250;
    /**
     * in px
     */
    private static readonly DRAG_THRESHOLD = 1;

    private static MOUSE_BUTTON_LEFT = 0;
    private static MOUSE_BUTTON_RIGHT = 2;

    private eventTarget: EventTarget;
    private dragged = false;
    private lastClickedTimeStamp?: number;
    private singleClickTimeout?: number;

    constructor(private readonly canvas: HTMLCanvasElement) {
        // use to publish events as target of canvas to keep the correct offsets
        this.eventTarget = this.canvas;

        // disable right button click inside canvas
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
    }

    public addEventListener(type: EventTypes, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void {
        this.eventTarget.addEventListener(type, listener, options);
    }

    public removeEventListener(type: EventTypes, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {
        this.eventTarget.removeEventListener(type, callback, options);
    }

    public handleMouseMove(event: MouseEvent): void {
        if (1 === event.buttons) {
            if (!this.dragged && event.movementX + event.movementY < MouseEventAdapter.DRAG_THRESHOLD) {
                // drag cancelled when it is moved less than 1px
                return;
            }

            if (!this.dragged) {
                this.dragged = true;
                this.eventTarget.dispatchEvent(new CustomMouseEvent('leftmousedragstart', event));
                return;
            }

            this.eventTarget.dispatchEvent(new CustomMouseEvent('leftmousedragmove', event));
        }
    }

    public handleMouseUp(event: MouseEvent): void {
        if (MouseEventAdapter.MOUSE_BUTTON_LEFT === event.button) {
            if (this.lastClickedTimeStamp && Date.now() - this.lastClickedTimeStamp <= MouseEventAdapter.DOUBLECLICK_TIMEOUT) {
                if (this.singleClickTimeout) {
                    this.cancelSingleClick();
                }
                this.eventTarget.dispatchEvent(new CustomMouseEvent('leftmousedoubleclick', event));
            } else {
                if (!this.dragged) {
                    this.singleClickTimeout = setTimeout(this.createSingleClickHandler(new CustomMouseEvent('leftmouseclick', event)), MouseEventAdapter.DOUBLECLICK_TIMEOUT);
                }
            }
        } else if (MouseEventAdapter.MOUSE_BUTTON_RIGHT === event.button) {
            // right button
            this.eventTarget.dispatchEvent(new CustomMouseEvent('rightmouseclick', event));
        }
        this.lastClickedTimeStamp = Date.now();
        if (this.dragged) {
            this.dragged = false;
            this.eventTarget.dispatchEvent(new CustomMouseEvent('leftmousedragend', event));
        }
    }

    private cancelSingleClick(): void {
        clearTimeout(this.singleClickTimeout);
        this.singleClickTimeout = undefined;
    }

    private createSingleClickHandler(event: MouseEvent): () => void {
        return () => {
            this.eventTarget.dispatchEvent(event);
        };
    }
}