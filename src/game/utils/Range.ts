export class Range {
  constructor(public readonly min: number, public readonly max: number) {}

  public includes(value: number) {
    return value >= this.min && value <= this.max;
  }
}
