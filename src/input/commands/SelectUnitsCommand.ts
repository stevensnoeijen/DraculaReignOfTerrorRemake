import { Entity } from 'ecsy';
import { EntityHelper } from '../../helpers/EntityHelper';
import { ICommand } from './ICommand';

export class SelectUnitsCommand implements ICommand {
    constructor(private readonly entities: Entity[]) {

    }

    public execute(): void {
        this.entities.forEach(EntityHelper.select);
    }
}