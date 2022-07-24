import { Component, Types } from 'ecsy';
import { Tree } from '../../ai/behaviortree/Tree';

export interface BehaviorTreeComponentProps {
  tree: Tree;
}

export class BehaviorTreeComponent extends Component<BehaviorTreeComponentProps> {
  static schema = {
    tree: { type: Types.Ref, default: false },
  };

  declare tree: Tree;
}
