import { Vector2 } from '../../math/Vector2';
import { Shape } from './Shape';

export interface IArcProps {
    position?: Vector2;
    radius: number;
    startAngle: number;
    endAngle: number;
    fillStyle?: string;
    strokeStyle?: string;
}

const defaultProps: Partial<IArcProps> = {
    position: Vector2.ZERO,
}

export class Arc extends Shape {
    declare public position: Vector2;
    public radius!: number;
    public startAngle!: number;
    public endAngle!: number;
    public fillStyle!: string | null;
    public strokeStyle!: string | null;

    constructor(props: IArcProps) {
        super({
            ...defaultProps,
            ...props,
        })
    }
}