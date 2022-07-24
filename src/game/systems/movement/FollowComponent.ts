import { Component, Types, Entity } from 'ecsy';

type FollowComponentProps = {
  follow: Entity | null;
};

export class FollowComponent extends Component<FollowComponentProps> {
  static schema = {
    follow: { type: Types.Ref, default: null },
  };

  follow!: Entity | null;
}
