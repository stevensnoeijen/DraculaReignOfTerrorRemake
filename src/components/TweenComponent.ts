import { Component, Types } from 'ecsy';
import { Tween } from '../graphics/tween/Tween';

interface ITweenComponentProps { }

export class TweenComponent extends Component<ITweenComponentProps> {
	tween: Tween | null = null;
}

TweenComponent.schema = {
	tween: { type: Types.Ref, default: null, },
};
