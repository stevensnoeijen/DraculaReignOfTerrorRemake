import { Component, Types } from 'ecsy';

interface TeamComponentProps {
  number?: number;
}

export class TeamComponent extends Component<TeamComponentProps> {
  static schema = {
    number: { type: Types.Number },
  };

  declare number: number;
}
