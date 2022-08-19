import { Component, Types } from 'ecsy';

import { Animator } from '~/game/animation/Animator';

export interface AssetComponentProps {
  animator: Animator;
}

export class AssetComponent extends Component<AssetComponentProps> {
  static schema = {
    animator: { type: Types.Ref },
  };

  animator!: Animator;
}
