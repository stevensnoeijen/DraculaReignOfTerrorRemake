import { Component, Types } from 'ecsy';

import { Position } from '../../utils';

type Path = Position[];

type MovePathComponentProps = {
	path: Path;
};

export class MovePathComponent extends Component<MovePathComponentProps> {
	static schema = {
		path: { type: Types.Array, default: [] },
	};	

    path!: Path;
}