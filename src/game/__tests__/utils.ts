import { Entity, World } from 'ecsy';

import { TeamComponent } from './../systems/TeamComponent';
import { TransformComponent } from './../systems/TransformComponent';
import { Position } from '../utils';
import { Vector2 } from '../math/Vector2';


export type CreateRandomEntities = (length?: number, minPosition?: Position, maxPosition?: Position, team?: number) => Entity[];

export const constructCreateRandomEntities = (world: World): CreateRandomEntities => {
    return (length: number = 30, minPosition: Position = { x: 3, y: 3}, maxPosition: Position = { x: 100, y: 100 }, team: number = 2) => {
        return Array.from({ length: length }).map(() => {
            return world.createEntity()
                .addComponent(TransformComponent, {
                    position: new Vector2(
                        Math.round(Math.random() * maxPosition.x) + minPosition.x,
                        Math.round(Math.random() * maxPosition.y) + minPosition.y
                    ),
                })
                .addComponent(TeamComponent, {
                    number: team
                });
        });
    };
}

