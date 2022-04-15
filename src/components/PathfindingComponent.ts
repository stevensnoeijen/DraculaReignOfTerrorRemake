import { Component, Types } from 'ecsy';
import { Pathfinding } from '../ai/Pathfinding';

export interface IPathfindingComponentProps {
	pathfinding: Pathfinding;
}

export class PathfindingComponent extends Component<IPathfindingComponentProps> {
	declare pathfinding: Pathfinding;
}

PathfindingComponent.schema = {
	pathfinding: { type: Types.Ref },
};
