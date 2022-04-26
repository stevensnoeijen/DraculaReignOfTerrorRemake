export enum State {
    RUNNING,
    SUCCESS,
    FAILURE,
}

export class Node {
    private _state = State.FAILURE;

    public parent: Node|null = null; 

    protected _children: Node[] = [];

    public readonly data: Map<string, unknown> = new Map();

    constructor(children: Node[]) {
        this.children = children;
    }
    
    public get state (): State {
        return this._state;
    }

    protected set state(value: State) {
        this._state = value;
    }

    public get children(): Node[] {
        return this._children;
    }

    public set children(children: Node[]) {
        children.forEach((child => this.attach(child)));
    }

    public attach(child: Node): void {
        this._children.push(child);
        child.parent = this;
    }

    public detach(child: Node): void {
        this._children = this._children.filter((c) => c !== child);
        child.parent = null;
    }

    public evaluate(): State {
        return this.state;
    }

    public getData(key: string): unknown|null {
        if (this.data.has(key)) {
            return this.data.get(key);
        }

        return this.getDataOfParent(key);
    }

    private getDataOfParent(key: string): unknown|null {
        let node = this.parent;
        while (node != null) {
            const value = node.getData(key)
            if (value != null) {
                return value;
            } else {
                node = node.parent;
            }
        }
    
        return null;
    }

    public setData(key: string, value: unknown): void {
        this.data.set(key, value);
    }

    public hasChildren(): boolean {
        return this.children.length > 0;
    }
}