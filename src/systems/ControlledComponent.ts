import { Component, Types } from 'ecsy';

export type By = 'player' | 'ai';

interface ControlledComponentProps {
	by?: By | null;
}

export class ControlledComponent extends Component<ControlledComponentProps> {
	static schema = {
		by: { type: Types.String, default: null, },
	};
	

	declare by: By | null;
}
