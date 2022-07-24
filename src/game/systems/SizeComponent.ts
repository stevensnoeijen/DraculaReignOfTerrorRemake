import { Component, Types } from 'ecsy';

interface ISizeComponentProps {
  width?: number;
  height?: number;
}

export class SizeComponent extends Component<ISizeComponentProps> {
  static schema = {
    width: { type: Types.Number, default: 0 },
    height: { type: Types.Number, default: 0 },
  };

  declare width: number;
  declare height: number;
}
