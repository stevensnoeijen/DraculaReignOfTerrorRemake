import { System, SystemQueries } from 'ecsy';

import { TargetComponent } from './TargetComponent';
import { FollowComponent } from './../movement/FollowComponent';

export class TargetSystem extends System {
    static queries: SystemQueries = {
        entities: {
            components: [TargetComponent]
        }
    };

    timePassed = 0;
    triggerTime = 1000;

    public execute(delta: number, time: number): void {
        this.timePassed += delta;
        // trigger every second
        if (this.timePassed > this.triggerTime) {
            console.log('update');
            for (const entity of this.queries.entities.results) {
                const targetComponent = entity.getComponent(TargetComponent)!;

                if (targetComponent.target != null) {
                    entity.getMutableComponent(FollowComponent)!.follow = targetComponent.target;
                }
            }

            this.timePassed = this.triggerTime - this.timePassed;
        }
    }
}