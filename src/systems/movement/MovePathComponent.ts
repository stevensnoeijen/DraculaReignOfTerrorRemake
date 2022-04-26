import { Component, Types } from 'ecsy';

import { Position } from '../../utils';

type Path = Position[];

type MovePathComponentProps = {
	path: Path;
};

export class MovePathComponent extends Component<MovePathComponentProps> {
    path!: Path;
}

MovePathComponent.schema = {
	path: { type: Types.Array, default: [] },
};
