import { Component, Types } from 'ecsy';

interface TeamComponentProps {
	number?: number;
}

export class TeamComponent extends Component<TeamComponentProps> {
	declare number: number;
}

TeamComponent.schema = {
	number: { type: Types.Number },
};
