import * as PIXI from 'pixi.js';

import { BLACK } from '../../colors';

import { Input } from '~/game/Input';
import { Vector2 } from '~/game/math/Vector2';

const SINGLE_UNIT_DISTANCE = 5;

export class MouseSelection {
  private _started: boolean;
  public readonly rectangle: PIXI.Graphics;
  public startPosition: Vector2 | null = null;

  constructor() {
    this.rectangle  = new PIXI.Graphics();
    this.rectangle.visible = false;
    this._started = false;
  }

  public get started() {
    return this._started;
  }

  public start() {
    this.startPosition = Input.mousePosition;
    this.rectangle.visible = true;
    this._started = true;
  };

  public update() {
    if (this.startPosition == null) return;

    const width = Input.mousePosition.x - this.startPosition!.x;
    const height = Input.mousePosition.y - this.startPosition!.y;

    this.rectangle.clear();
    this.rectangle.lineStyle(1, BLACK);
    this.rectangle.drawRect(
      this.startPosition.x,
      this.startPosition.y,
      width,
      height
    );
  }

  public end() {
    this.rectangle.visible = false;
    this.rectangle.clear();
    this.startPosition = null;
    this._started = false;
  }

  public isSimpleClick(): boolean {
    if (this.startPosition == null) return false;

    return (
      Vector2.distance(this.startPosition, Input.mousePosition) <
      SINGLE_UNIT_DISTANCE
    );
  };

  public isDragging(): boolean {
    return Vector2.distance(this.startPosition!, Input.mousePosition) >
      SINGLE_UNIT_DISTANCE;
  }
}
