import { Attributes, System, World } from 'ecsy';
import { Input, KeyStatus, MouseStatus } from '../input/Input';
import { Vector2 } from '../math/Vector2';

export class InputSystem extends System {
    private readonly canvas: HTMLCanvasElement;
    private keyQueue: KeyboardEvent[] = [];
    private mouseEvents: MouseEvent[] = [];

    constructor(world: World, attributes: Attributes) {
        super(world, attributes);
        this.canvas = attributes.canvas;

        this.canvas.addEventListener('mousedown', (event: MouseEvent) => {
            this.mouseEvents.push(event);
        });
        this.canvas.addEventListener('mouseup', (event: MouseEvent) => {
            this.mouseEvents.push(event);
        });
        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
            Input.mousePosition = new Vector2({
                x: event.offsetX,
                y: event.offsetY,
            });
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyQueue.push(event);
        });
        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.keyQueue.push(event);
        });
        window.addEventListener('keypress', (event: KeyboardEvent) => {
            this.keyQueue.push(event);
        });
    }

    public execute(delta: number, time: number): void {
        Input.clearMouseStatuses();
        if (this.mouseEvents.length > 0) {
            for (const mouseEvent of this.mouseEvents) {
                let status: MouseStatus = undefined;
                if (mouseEvent.type === 'mousedown') {
                    status = 'down';
                }
                if (mouseEvent.type === 'mouseup') {
                    status = 'up';
                }
                Input.mouseStatuses[mouseEvent.button] = status;
            }
        }

        Input.clearKeysStatus();
        if (this.keyQueue.length > 0) {
            let event;
            while ((event = this.keyQueue.pop())) {
                Input.addKeyStatus(event.key, event.type as KeyStatus);
            }
            this.keyQueue = [];
        }
    }
}
