export class Alive {
  constructor(
    private alive: boolean
  ) {}

  public isAlive() {
    return this.alive;
  }

  public isDead() {
    return !this.alive;
  }

  public die() {
    this.alive = false;
  }
}
