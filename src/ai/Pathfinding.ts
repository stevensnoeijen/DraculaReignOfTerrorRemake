import { arrayIncludesByEquals, filterEmpty, toEqual } from "../utils";

type Position = { x : number; y: number; };

export const isPositionEqual = (a: Position, b: Position): boolean => {
    return a.x === b.x 
        && a.y === b.y;
}

export class PathNode {
	/**
	 * The distance between the current node and the start node.
	 */
	public gCost = 0;

	/**
	 * The heuristic — estimated distance from the current node to the end node.
	 */
	public hCost = 0;

	/**
	 * The total cost of the node.
	 */
	public fCost = 0;
	
	constructor(
        public readonly parent: PathNode | null = null,
		public readonly position: Position,
	) {}

	public calculateFCost(): void {
		this.fCost = this.gCost + this.hCost;
	}

	public equals(other: unknown): boolean {
		if (other instanceof PathNode) {
			return isPositionEqual(this.position, other.position);
		}

		return false;
	}

	public toString(): string {
		return this.position.x + ',' + this.position.y;
	}
}

export const getLowestFCostNode = (nodes: PathNode[]): PathNode|null => {
	let lowestFCostNode = nodes[0];
	for (let i = 1; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.fCost < lowestFCostNode.fCost) {
			lowestFCostNode = node;
		}
	}

	return lowestFCostNode ?? null;
}

export const createPathFromEndNode = (endNode: PathNode): PathNode[] => {
	const path = [];
	path.push(endNode);

	let currentNode = endNode;
	while (currentNode.parent !== null) {
		path.push(currentNode.parent);
		currentNode = currentNode.parent;
	}

	path.reverse();

	return path;
}

const relativeAdjacentPositions: readonly Position[] = [
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: -1, y: -1 },
	{ x: -1, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 1 },
];

type Grid = number[][];

export const isPositionInsideGrid = (grid: Readonly<Grid>, position: Position): boolean => {
	return position.x >= 0 && position.x < grid.length
		&& position.y >= 0 && position.y < grid[position.x].length;
}

export const generateAdjacentPathNodes = (grid: Grid, currentNode: PathNode): PathNode[] => {
	return relativeAdjacentPositions.map((relativeAdjacentPosition) => {
		const position: Position = {
			x: currentNode.position.x + relativeAdjacentPosition.x,
			y: currentNode.position.y + relativeAdjacentPosition.y,
		};

		// check if position is in range of the grid
		if (!isPositionInsideGrid(grid, position)) {
			return;
		}

		// check if walkable terrain
		if (grid[position.x][position.y] !== 0) {
			return;
		}

		return new PathNode(currentNode, position);
	}).filter(filterEmpty) as PathNode[];
}


const MOVE_STRAIGHT_COST = 10;
const MOVE_DIAGONAL_COST = 14;

export const calculateDistanceCost = (from: PathNode, to: PathNode): number => {
	const xDistance = Math.abs(from.position.x - to.position.x);
	const yDistance = Math.abs(from.position.y - to.position.y);
	const remaining = Math.abs(xDistance - yDistance);

	return (
		MOVE_DIAGONAL_COST * Math.min(xDistance, yDistance) +
		MOVE_STRAIGHT_COST * remaining
	);
}

export const astar = (grid: Grid, start: Position, end: Position): PathNode[] => {
    const startNode = new PathNode(null, start);
	const endNode = new PathNode(null, end);

	const openList: PathNode[] = [];
	const closedList: PathNode[] = [];

	openList.push(startNode);

	while(openList.length > 0) {
		const currentNode = getLowestFCostNode(openList);
		if (currentNode == null) {
			break;
		}

		// remove from openList
		openList.splice(openList.indexOf(currentNode), 1);

		closedList.push(currentNode);

		if (currentNode.equals(endNode)) {		
			return createPathFromEndNode(currentNode);
		}

		const adjacentNodes = generateAdjacentPathNodes(grid, currentNode);

		for(const adjacentNode of adjacentNodes) {
			if (arrayIncludesByEquals(closedList, adjacentNode)){
				continue;
			};

			// set cost values
			adjacentNode.gCost = currentNode.gCost + 1;
			adjacentNode.hCost = calculateDistanceCost(adjacentNode, endNode);
			adjacentNode.calculateFCost();

			if (arrayIncludesByEquals(openList, adjacentNode)) {
				const openNode = openList.find(toEqual(adjacentNode))!;
				// 
				if (adjacentNode.gCost > openNode.gCost) {
					continue;
				}
			}

			openList.push(adjacentNode);
		}
	}

	return [];
}