import { Grid } from '../Grid';

export class PathNode {
	public gCost = 0;
	public hCost = 0;
	public _fCost = 0;
	public cameFromNode: PathNode | null = null;

	constructor(
		private readonly grid: Grid<PathNode>,
		public readonly x: number,
		public readonly y: number
	) {}

	public get fCost(): number {
		return this._fCost;
	}

	public calculateFCost(): void {
		this._fCost = this.gCost + this.hCost;
	}

	public equals(obj: unknown): boolean {
		if (obj instanceof PathNode) {
			return obj.x === this.x && obj.y === this.y;
		}

		return false;
	}

	public toString(): string {
		return this.x + ',' + this.y;
	}
}
