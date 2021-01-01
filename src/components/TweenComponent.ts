import { Component, Types } from 'ecsy';
import { Tween } from '../tween';

interface ITweenComponentProps {

}

export class TweenComponent extends Component<ITweenComponentProps> {
	tween?: Tween;
}

TweenComponent.schema = {
	tween: { type: Types.Ref, default: false },
};
