import { EventBus } from 'sim-ecs/dist/events/event-bus';

export const CELL_SIZE = 16;

export const worldEventBus = new EventBus();

export class Assets {
  static readonly ENTITY_DEFINITIONS = 'assets/entity-definitions.json';
}
