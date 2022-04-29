import { Component, Types } from 'ecsy';

export interface IHealthComponentProps {
	points: number;
	maxPoints: number;
}

export class HealthComponent extends Component<IHealthComponentProps> {
	static schema = {
		points: { type: Types.Number, default: 10 },
		maxPoints: { type: Types.Number, default: 10 },
	};	

	declare points: number;
	declare maxPoints: number;
}