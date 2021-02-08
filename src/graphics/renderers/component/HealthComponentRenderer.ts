import { Entity } from 'ecsy';
import { HealthComponent } from '../../../components/HealthComponent';
import { TransformComponent } from '../../../components/TransformComponent';
import { SelectableComponent } from '../../../components/SelectableComponent';
import { SizeComponent } from '../../../components/SizeComponent';
import { IComponentRenderer } from '../IComponentRenderer';

export class HealthComponentRenderer implements IComponentRenderer {
    constructor(private readonly context: CanvasRenderingContext2D) { }

    public render(entity: Entity): void {
        const selectable = entity.getComponent(SelectableComponent);
        if (!selectable || !selectable.selected) {
            return;
        }
        const health = entity.getComponent(HealthComponent);
        if (!health) {
            return;
        }
        const transform = entity.getComponent(TransformComponent);
        if (!transform) {
            return;
        }
        const size = entity.getComponent(SizeComponent);
        if (!size) {
            return;
        }

        this.context.translate(transform.position.x, transform.position.y + size.height - 5);

        const healthbarProps = {
            x: -(size.width / 2),
            y: 0,
            width: size.width,
            height: 5,
        };

        this.context.beginPath();
        this.context.rect(healthbarProps.x, healthbarProps.y, healthbarProps.width, healthbarProps.height);
        this.context.fillStyle = '#000';
        this.context.fill();

        const percentage = health.points / health.maxPoints;
        if (percentage > 0) {
            this.context.beginPath();
            this.context.rect(healthbarProps.x + 1, healthbarProps.y + 1, percentage * (healthbarProps.width - 2), healthbarProps.height - 2);
            this.context.fillStyle = this.healthColor(percentage);
            this.context.fill();
        }

        this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
    }

    private healthColor(percentage: number): string {
        if (percentage >= .66) {
            return 'green';
        } else if (percentage >= .33) {
            return 'orange';
        } else {
            return 'red';
        }
    }
}