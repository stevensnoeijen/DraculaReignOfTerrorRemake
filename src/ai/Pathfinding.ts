import { Constants } from '../Constants';
import { Grid } from '../Grid';
import { Vector2 } from '../math/Vector2';
import { PathNode } from './PAthNode';

export class Pathfinding {
	private static readonly MOVE_STRAIGHT_COST = 10;
	private static readonly MOVE_DIAGONAL_COST = 14;

	public readonly grid: Grid<PathNode>;
	private openList: PathNode[] | null;
	private closedList: PathNode[] | null;

	public constructor(width: number, height: number) {
		this.grid = new Grid({
			width: width,
			height: height,
			cellSize: Constants.CELL_SIZE,
			originPosition: Vector2.ZERO,
			initGridObject: (grid, x, y) => new PathNode(grid, x, y),
		});
		this.openList = null;
		this.closedList = null;
	}

	public findPath(
		startX: number,
		startY: number,
		endX: number,
		endY: number
	): PathNode[] | null {
		const startNode = this.grid.getGridObject(startX, startY)!;
		const endNode = this.grid.getGridObject(endX, endY)!;

		this.openList = [];
		this.closedList = [];

		this.openList.push(startNode);

		// reset all nodes
		Array.from({ length: this.grid.width }, (i, x) => {
			Array.from({ length: this.grid.height }, (j, y) => {
				const pathNode = this.grid.getGridObject(x, y)!;
				pathNode.gCost = Number.MAX_VALUE;
				pathNode.calculateFCost();
				pathNode.cameFromNode = null;
			});
		});

		startNode.gCost = 0;
		startNode.hCost = this.calculateDistanceCost(startNode, endNode);
		startNode.calculateFCost();

		while (this.openList!.length > 0) {
			const currentNode = this.getLowestFCostNode(this.openList!);
			if (currentNode.equals(endNode)) {
				// reached final node
				return this.calculatePath(endNode);
			}

			this.openList.splice(this.openList.indexOf(currentNode), 1);
			this.closedList.push(currentNode);

			for (const neighbourNode of this.getNeighbourNodes(currentNode)) {
				if (this.closedList.includes(neighbourNode)) {
					continue;
				}

				const tentativeGCost =
					currentNode.gCost +
					this.calculateDistanceCost(currentNode, neighbourNode);
				if (tentativeGCost < neighbourNode.gCost) {
					neighbourNode.cameFromNode = currentNode;
					neighbourNode.gCost = tentativeGCost;
					neighbourNode.hCost = this.calculateDistanceCost(
						neighbourNode,
						endNode
					);
					neighbourNode.calculateFCost();

					if (!this.openList.includes(neighbourNode)) {
						this.openList.push(neighbourNode);
					}
				}
			}
		}

		// out of nodes in the open list
		// no path found
		return null;
	}

	private calculatePath(endNode: PathNode): PathNode[] {
		const path = [];
		path.push(endNode);

		let currentNode = endNode;
		while (currentNode.cameFromNode !== null) {
			path.push(currentNode.cameFromNode);
			currentNode = currentNode.cameFromNode;
		}

		path.reverse();

		return path;
	}

	private calculateDistanceCost(a: PathNode, b: PathNode): number {
		const xDistance = Math.abs(a.x - b.x);
		const yDistance = Math.abs(a.y - b.y);
		const remaining = Math.abs(xDistance - yDistance);

		return (
			Pathfinding.MOVE_DIAGONAL_COST * Math.min(xDistance, yDistance) +
			Pathfinding.MOVE_STRAIGHT_COST * remaining
		);
	}

	private getLowestFCostNode(nodes: PathNode[]): PathNode {
		let lowestFCostNode = nodes[0];
		for (let i = 1; i < nodes.length; i++) {
			const node = nodes[i];
			if (node.fCost < lowestFCostNode.fCost) {
				lowestFCostNode = node;
			}
		}

		return lowestFCostNode;
	}

	private getNeighbourNodes(currentNode: PathNode): PathNode[] {
		const neighbours: PathNode[] = [];

		if (currentNode.x - 1 >= 0) {
			// left
			neighbours.push(
				this.grid.getGridObject(currentNode.x - 1, currentNode.y)!
			);
			// left down
			if (currentNode.y - 1 >= 0) {
				neighbours.push(
					this.grid.getGridObject(currentNode.x - 1, currentNode.y - 1)!
				);
			}
			// left up
			if (currentNode.y + 1 < this.grid.height) {
				neighbours.push(
					this.grid.getGridObject(currentNode.x - 1, currentNode.y + 1)!
				);
			}
		}
		if (currentNode.x + 1 >= 0) {
			// right
			neighbours.push(
				this.grid.getGridObject(currentNode.x + 1, currentNode.y)!
			);
			// right down
			if (currentNode.y - 1 >= 0) {
				neighbours.push(
					this.grid.getGridObject(currentNode.x + 1, currentNode.y - 1)!
				);
			}
			// right up
			if (currentNode.y + 1 < this.grid.height) {
				neighbours.push(
					this.grid.getGridObject(currentNode.x + 1, currentNode.y + 1)!
				);
			}
		}
		// down
		if (currentNode.y - 1 >= 0) {
			neighbours.push(
				this.grid.getGridObject(currentNode.x, currentNode.y - 1)!
			);
		}
		// up
		if (currentNode.y + 1 < this.grid.height) {
			neighbours.push(
				this.grid.getGridObject(currentNode.x, currentNode.y + 1)!
			);
		}

		return neighbours;
	}
}
