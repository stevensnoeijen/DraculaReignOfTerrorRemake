import { Component, Types } from 'ecsy';

type MovableComponentProps = {
  moving: boolean;
};

export class MovableComponent extends Component<MovableComponentProps> {
  static schema = {
    moving: { type: Types.Boolean, default: false },
  };

  declare moving: boolean;
}
