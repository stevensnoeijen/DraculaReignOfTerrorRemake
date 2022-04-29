import { Entity } from "ecsy";

import { Predicate } from "../../utils";
import { TeamComponent } from "../TeamComponent";

export * from './transform';

export const isEnemy = (team: number): Predicate<Entity> => {
    return (entity: Entity) => {
        if (!entity.hasComponent(TeamComponent)){
            return false;
        }

        const teamComponent = entity.getComponent(TeamComponent)!;

        return teamComponent.number !== team;
    };
};

export const isSameEntity = (entity: Entity): Predicate<Entity> => {
	return (other: Entity) => other.id === entity.id;
};