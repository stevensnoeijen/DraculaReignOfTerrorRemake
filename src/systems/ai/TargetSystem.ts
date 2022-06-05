import { Follow } from './../../ai/behaviortree/nodes/entity/Follow';
import { System, SystemQueries } from 'ecsy';

import { TargetComponent } from './TargetComponent';
import { FollowComponent } from './../movement/FollowComponent';
import { AliveComponent } from './../alive/AliveComponent';

export class TargetSystem extends System {
    static queries: SystemQueries = {
        entities: {
            components: [TargetComponent]
        }
    };

    public execute(delta: number, time: number): void {
        this.checkDead();
    }

    private checkDead (): void {
        for (const entity of this.queries.entities.results) {
            const targetComponent = entity.getComponent(TargetComponent)!;
            if (targetComponent.target === null) {
                return;
            }
            
            const targetAliveComponent = targetComponent.target.getComponent(AliveComponent)

            if(targetAliveComponent !== null && !targetAliveComponent!.alive){
                entity.getMutableComponent(TargetComponent)!.target = null;
            }
        }
    }
}