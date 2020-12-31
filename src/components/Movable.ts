import { Component, Types } from 'ecsy';

type MovableOptions = {
	moving: boolean;
};

export class Movable extends Component<MovableOptions> {
	moving: boolean;
}

Movable.schema = {
	moving: { type: Types.Boolean, default: false },
};
