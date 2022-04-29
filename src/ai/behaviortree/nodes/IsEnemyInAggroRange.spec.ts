import { Entity, World } from 'ecsy';

import { TransformComponent } from './../../../systems/TransformComponent';
import { IsEnemyInAggroRange } from './IsEnemyInAggroRange';
import { Vector2 } from '../../../math/Vector2';
import { Node, State } from './Node';
import { TeamComponent } from './../../../systems/TeamComponent';
import { constructCreateRandomEntities, CreateRandomEntities } from '../../../__tests__/utils';

describe('IsEnemyInAggroRange', () => {
    describe('evaluate', () => {
        
        let world: World;
        let createRandomEntities: CreateRandomEntities;

        beforeEach(() => {
            world = new World()
                .registerComponent(TransformComponent)
                .registerComponent(TeamComponent);
            createRandomEntities = constructCreateRandomEntities(world);    
        });


        it('should success set target when there is an enemy within range', () => {
            const entity = world.createEntity()
                .addComponent(TransformComponent, {
                    position: new Vector2(0, 0),
                })
                .addComponent(TeamComponent, {
                    number: 1
                });

            const entities = [
                ...createRandomEntities(10, { x: 5, y: 5, }, { x: 50, y: 50 }),
                entity,
            ];

            const node = new IsEnemyInAggroRange(entities);
            const parent = new Node();
            parent.setData('entity', entity);
            parent.attach(node);

            expect(node.evaluate()).toBe(State.SUCCESS);
            expect(parent.getData('target')).not.toBeNull();
        });

        it('should fail and not set target when there is no enemy within range', () => {
            const entity = world.createEntity()
                .addComponent(TransformComponent, {
                    position: new Vector2(0, 0),
                })
                .addComponent(TeamComponent, {
                    number: 1
                });

            const entities = [
                entity,
                ...createRandomEntities(10, { x: 5, y: 5, }, { x: 50, y: 50 }, 1),// create friendly entities nearby
            ];

            const node = new IsEnemyInAggroRange(entities);
            const parent = new Node();
            parent.setData('entity', entity);
            parent.attach(node);

            expect(node.evaluate()).toBe(State.FAILURE);
            expect(parent.getData('target')).toBeNull();
        });
    });
});