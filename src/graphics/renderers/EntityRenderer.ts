import { Component, Entity } from 'ecsy';
import { DebugComponent } from '../../components/DebugComponent';
import { GridViewComponent } from '../../components/GridViewComponent';
import { HealthComponent } from '../../components/HealthComponent';
import { RenderComponent } from '../../components/RenderComponent';
import { SelectableComponent } from '../../components/SelectableComponent';
import { ShapeComponent } from '../../components/ShapeComponent';
import { TextComponent } from '../../components/TextComponent';
import { TransformComponent } from '../../components/TransformComponent';
import { EntityHelper } from '../../helpers/EntityHelper';
import { DebugComponentRenderer } from './component/DebugComponentRenderer';
import { GridViewComponentRenderer } from './component/GridViewComponentRenderer';
import { HealthComponentRenderer } from './component/HealthComponentRenderer';
import { SelectionComponentRenderer } from './component/SelectionComponentRenderer';
import { ShapeComponentRenderer } from './component/ShapeComponentRenderer';
import { TextComponentRenderer } from './component/TextComponentRenderer';
import { IComponentRenderer } from './IComponentRenderer';

type RendererByComponent = {
    component: typeof Component;
    renderer: IComponentRenderer;
};

/**
 * Facade for rendering an entity.
 */
export class EntityRenderer {
    private readonly componentRenderers: RendererByComponent[] = [];

    constructor(private readonly context: CanvasRenderingContext2D) {
        // define default renderers by component type
        this.componentRenderers.push({
            component: ShapeComponent,
            renderer: new ShapeComponentRenderer(this.context),
        });
        this.componentRenderers.push({
            component: SelectableComponent,
            renderer: new SelectionComponentRenderer(this.context),
        });
        this.componentRenderers.push({
            component: HealthComponent,
            renderer: new HealthComponentRenderer(this.context),
        });
        this.componentRenderers.push({
            component: TextComponent,
            renderer: new TextComponentRenderer(this.context),
        });
        this.componentRenderers.push({
            component: DebugComponent,
            renderer: new DebugComponentRenderer(this.context),
        });
        this.componentRenderers.push({
            component: GridViewComponent,
            renderer: new GridViewComponentRenderer(this.context),
        });
    }

    private getRenderersByEntityComponents(entity: Entity): IComponentRenderer[] {
        return this.componentRenderers.filter(
            (componentRenderer) => entity.hasComponent(componentRenderer.component)
        ).map((componentRenderer) => componentRenderer.renderer);
    }

    public render(entity: Entity): void {
        if (!EntityHelper.isVisible(entity, true)) {
            return;
        }
        const transformComponent = entity.getComponent(TransformComponent);

        const renderers = this.getRenderersByEntityComponents(entity);
        if (renderers.length === 0) {
            console.warn(`no renderer found for entity #${entity.id}, removing RenderComponent`);
            entity.removeComponent(RenderComponent);
            return;
        }

        renderers.forEach((renderer) => {
            if (transformComponent) {
                this.context.translate(transformComponent.position.x, transformComponent.position.y);
            }
            renderer.render(entity);

            this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
        });
    }
}