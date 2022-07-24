import { Vector2 } from './math/Vector2';

export type KeyStatus = 'keydown' | 'keypress' | 'keyup';
type KeysStatus = { [key: string]: KeyStatus | undefined };
export type MouseButtonStatus = 'click' | 'dblclick' | 'mouseup' | 'mousedown';
type MouseButtons = { [button: number]: MouseButtonStatus | undefined };

export class Input {
  private static keysStatus: KeysStatus = {};
  public static mousePosition: Vector2 = Vector2.ZERO;
  private static mouseButtons: MouseButtons = {};
  private static mouseClick = 0;

  public static addKeyStatus(key: string, type: KeyStatus): void {
    this.keysStatus[key] = type;
  }

  public static setMouseButton(
    button: number,
    status: MouseButtonStatus
  ): void {
    if ('click' === status) {
      this.mouseClick = 1;
    } else if ('dblclick' === status) {
      this.mouseClick = 2;
    } else {
      this.mouseButtons[button] = status;
    }
  }

  /**
   * Cleans up key statussen that should be cleaned after a frame.
   */
  public static clearKeysStatus(): void {
    for (const key of Object.keys(this.keysStatus)) {
      if (this.keysStatus[key] === 'keyup') {
        this.keysStatus[key] = undefined;
      }
    }
  }

  /**
   * Cleans up mouse statusses that should be cleaned after a frame.
   */
  public static clearMouseStatuses(): void {
    for (const buttonString of Object.keys(this.mouseButtons)) {
      const button = parseInt(buttonString);
      if (this.mouseButtons[button] === 'mouseup') {
        this.mouseButtons[button] = undefined;
      }
    }
    this.mouseClick = 0;
  }

  private static isKey(key: string, type: KeyStatus): boolean {
    return this.keysStatus[key] === type;
  }

  public static isKeyPressed(key: string): boolean {
    return this.isKey(key, 'keypress');
  }

  public static isKeyDown(key: string): boolean {
    return this.isKey(key, 'keydown');
  }

  public static isKeyUp(key: string): boolean {
    return this.isKey(key, 'keyup');
  }

  public static isMouseButtonUp(button: number): boolean {
    return this.mouseButtons[button] === 'mouseup';
  }

  public static isMouseButtonDown(button: number): boolean {
    return this.mouseButtons[button] === 'mousedown';
  }

  public static isMouseClick(): boolean {
    return this.mouseClick === 1;
  }

  public static isMouseDblClick(): boolean {
    return this.mouseClick === 2;
  }
}
