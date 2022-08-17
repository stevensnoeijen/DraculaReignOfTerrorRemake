import * as PIXI from 'pixi.js';

export class Animation {
  constructor(
    public readonly textures: PIXI.Texture[],
    public readonly speed: number,
    public readonly loop: boolean
  ) {}

  public set(sprite: PIXI.AnimatedSprite): void {
    sprite.textures = this.textures;
    sprite.animationSpeed = this.speed;
    sprite.loop = this.loop;
    sprite.play();
  }
}
