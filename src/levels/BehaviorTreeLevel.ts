import * as PIXI from 'pixi.js';
import { World } from 'ecsy';

import { cellPositionToVector } from '../utils';
import { Level } from './Level';
import { EntityFactory } from '../EntityFactory';
import { createEmptyGrid, getGridSizeByScreen } from './utils';
import { BehaviorTreeComponent } from './../systems/ai/BehaviorTreeComponent';
import { Tree } from '../ai/behaviortree/Tree';
import {
    Selector,
    Timer,
    Inventer,
    Sequence,
} from './../ai/behaviortree/nodes/core';
import {
    Follow,
    Attack,
    IsControlledByPlayer,
    IsEnemyInAttackRange,
    HasTarget, 
    UnsetTarget, 
    IsMoving,
    SetTarget,
    IsEnemyInAggroRange
} from './../ai/behaviortree/nodes/entity';

export class BehaviorTreeLevel extends Level {
    private map: number[][];

    constructor(app: PIXI.Application, world: World) {
        super(app, world);

        this.map = createEmptyGrid(getGridSizeByScreen(app));
    }

    public get collisionMap(): number[][] {
        return this.map;
    }

    public load(): void {
        const player = EntityFactory.createUnit(this.world, {
            position: cellPositionToVector(1, 1),
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
            team: {
                number: 1,
            }
        });

        const enemy = EntityFactory.createUnit(this.world, {
            position: cellPositionToVector(1, 3),
            color: 'red',
            texture: this.app.loader.resources.swordsmen.texture!,
            team: {
                number: 2,
            }
        });

        const entities = [player, enemy];

        const tree = new Tree(
            new Selector([
                new Sequence([
                    new Inventer([new HasTarget()]),
                    new IsEnemyInAggroRange(entities),
                    new SetTarget(),
                ]),
                new Sequence([
                    new IsMoving(),
                    new Inventer([new IsEnemyInAggroRange(entities)]),
                    new UnsetTarget(),
                ]),
                new Sequence([
                    new HasTarget(),
                    new Selector([
                        new Sequence([
                            new IsEnemyInAttackRange(entities),
                            new Timer({
                                delay: 1000,
                                children: [new Attack()]
                            })
                        ]),
                        new Sequence([
                            new Inventer([new IsControlledByPlayer()]),
                            new Follow(),
                        ])
                    ])
                ])
            ])
        );
        tree.root.setData('entity', player);

        player.addComponent(BehaviorTreeComponent, {
            tree,
        })
    }
}