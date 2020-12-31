import { Component, Types } from 'ecsy';
import { Tween } from '../tween';

type TweenableOptions = {};

export class Tweenable extends Component<TweenableOptions> {
	tween?: Tween;
}

Tweenable.schema = {
	tween: { type: Types.Ref, default: false },
};
