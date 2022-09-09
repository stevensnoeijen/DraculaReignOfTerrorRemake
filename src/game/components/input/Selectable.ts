export class Selectable {
  constructor (
    private selected: boolean = false
  ) {}

  public select() {
    this.selected = true;
  }

  public deselect() {
    this.selected = false;
  }

  public isSelected() {
    return this.selected;
  }
}
