import { Attributes, System, World } from 'ecsy';
import { Input } from '../input/Input';

export class InputSystem extends System {
    private keyQueue: KeyboardEvent[] = [];

    constructor(world: World, attributes?: Attributes) {
        super(world, attributes);

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
        Input.clearKeyEvents();
        if (this.keyQueue.length > 0) {
            Input.addKeyEvents(this.keyQueue);
            this.keyQueue = [];
        }
    }
}
