import { Component, Types } from 'ecsy';
import { IEntity } from 'sim-ecs';

interface SimEcsComponentProps {
  entity: IEntity;
}

// TODO: remove after migration to sim-ecs
export class SimEcsComponent extends Component<SimEcsComponentProps> {
  static schema = {
    entity: { type: Types.Ref },
  };

  declare entity: IEntity;
}
