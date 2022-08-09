import { Component, Types } from 'ecsy';

import { EditableProperty } from '../component.decorator';

interface ISizeComponentProps {
  width?: number;
  height?: number;
}

export class SizeComponent extends Component<ISizeComponentProps> {
  static schema = {
    width: { type: Types.Number, default: 0 },
    height: { type: Types.Number, default: 0 },
  };

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  declare width: number;

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  declare height: number;
}
