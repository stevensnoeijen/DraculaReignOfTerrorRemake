export class Range {
  constructor(public readonly min: number, public readonly max: number) {}

  includes(value: number) {
    return value >= this.min && value <= this.max;
  }

  toJSON() {
    return {
      min: this.min,
      max: this.max,
    };
  }

  toString() {
    return `${this.min} - ${this.max}`;
  }
}
