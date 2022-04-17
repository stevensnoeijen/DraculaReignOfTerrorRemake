import { Attributes, System, World } from 'ecsy';
import { Input, KeyStatus, MouseButtonStatus } from '../Input';
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
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.mouseEvents.push(event);
        });
        this.canvas.addEventListener('dblclick', (event: MouseEvent) => {
            this.mouseEvents.push(event);
        });

        this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
            Input.mousePosition = new Vector2(event.offsetX, event.offsetY);
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
            let mouseEvent;
            while ((mouseEvent = this.mouseEvents.shift())) {
                Input.setMouseButton(mouseEvent.button, mouseEvent.type as MouseButtonStatus);
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
