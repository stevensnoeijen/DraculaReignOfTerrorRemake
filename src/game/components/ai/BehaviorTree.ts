
import { Tree } from '../../ai/behaviortree/Tree';

export class BehaviorTree {
  /**
   * Events generated in BehaviorTree
   * These events will be passed in the world,
   * thought the BehaviorTreeSystem after the tree.update is done.
   */
  private _events: Object[];

  constructor(
    public readonly tree: Tree,
    events: Object[] = [],
  ) {
    this._events = events;
  }

  get events(): readonly Object[] {
    return this._events;
  }

  addEvent(event: Object) {
    this._events.push(event);
  }

  clearEvents() {
    this._events = [];
  }
}
