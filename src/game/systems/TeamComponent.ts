import { Component, Types } from 'ecsy';

import { EditableProperty } from '../component.decorator';

interface TeamComponentProps {
  number?: number;
}

export class TeamComponent extends Component<TeamComponentProps> {
  static schema = {
    number: { type: Types.Number },
  };

  @EditableProperty({
    type: Number,
    nullable: false,
  })
  declare number: number;
}
