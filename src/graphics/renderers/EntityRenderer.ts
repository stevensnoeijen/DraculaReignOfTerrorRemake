import { Component, Entity } from 'ecsy';
import { DebugComponent } from '../../components/DebugComponent';
import { GridViewComponent } from '../../components/GridViewComponent';
import { HealthComponent } from '../../components/HealthComponent';
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

export type ComponentType = typeof Component;

type RendererByComponent = {
    component: ComponentType;
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

    /**
     * 
     * @param {Entity} entity 
     * @param {ComponentType} componentType to render
     */
    public render(entity: Entity, componentType: ComponentType): void {
        if (!EntityHelper.isVisible(entity, true)) {
            return;
        }
        if (!entity.hasComponent(componentType)) {
            return;
        }

        const transformComponent = entity.getComponent(TransformComponent);
        const renderer = this.getComponentRender(componentType);
        if (null === renderer) {
            return;
        }

        if (transformComponent) {
            this.context.translate(transformComponent.position.x, transformComponent.position.y);
        }
        renderer.render(entity);

        this.context.setTransform(1, 0, 0, 1, 0, 0);// reset transform
    }

    private getComponentRender(componentType: ComponentType): IComponentRenderer | null {
        const componentRenderer = this.componentRenderers.find(
            (componentRenderer) => componentType === componentRenderer.component
        );

        return componentRenderer !== undefined ? componentRenderer.renderer : null;
    }
}