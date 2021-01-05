import { Entity } from 'ecsy';
import { EntityHelper } from '../../helpers/EntityHelper';
import { ICommand } from './ICommand';

export class DeselectUnitsCommand implements ICommand {
    constructor(private readonly entities: Entity[]) {

    }

    public execute(): void {
        this.entities.forEach(EntityHelper.deselect);
    }
}