import { EventBus } from './../EventBus';
import { Attributes } from "ecsy";
import { Events } from '../Events';

export interface DefaultAttributes extends Attributes {
    eventBus: EventBus<Events>;
}