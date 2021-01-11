export interface ITweenAction {
    update(delta: number): void;
    readonly done: boolean;
}