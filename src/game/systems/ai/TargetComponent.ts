import { Component, Entity, Types } from 'ecsy';

interface TargetComponentProps {
  target: Entity | null;
}

export class TargetComponent extends Component<TargetComponentProps> {
  static schema = {
    target: { type: Types.Ref, default: null },
  };

  declare target: Entity | null;
}
