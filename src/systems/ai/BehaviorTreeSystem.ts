import { BehaviorTreeComponent } from './BehaviorTreeComponent';
import { System, SystemQueries } from 'ecsy';

export class BehaviorTreeSystem extends System {
    static queries: SystemQueries = {
        entities: {
            components: [BehaviorTreeComponent]
        }
    };

    timePassed = 0;
    triggerTime = 1000;

    public execute(delta: number, time: number): void {
        this.timePassed += delta;
        // trigger every second
        if (this.timePassed > this.triggerTime) {
            console.log('update');
            for(const entity of this.queries.entities.results) {
                const behaviorTreeComponent = entity.getComponent(BehaviorTreeComponent)!;

                behaviorTreeComponent.tree.update();
            }

            this.timePassed = this.triggerTime - this.timePassed;
        }
    }
}