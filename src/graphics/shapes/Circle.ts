import { Arc, IArcProps } from './Arc';

type ICircleProps = Omit<IArcProps, 'startAngle' | 'endAngle'>;

const defaultCircleProps: Pick<IArcProps, 'startAngle' | 'endAngle'> = {
    startAngle: 0 * Math.PI,
    endAngle: 2 * Math.PI,
};

export class Circle extends Arc {
    constructor(props: ICircleProps) {
        super({
            ...defaultCircleProps,
            ...props,
        });
    }
}