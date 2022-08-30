
import { PixiJsSystem } from '../../PixiJsSystem';

import { AnimatedSpriteComponent } from './AnimatedSpriteComponent';
import { TransformComponent } from './../../TransformComponent';

export class SpriteSystem extends PixiJsSystem {
  public static queries = {
    animatedSprites: {
      components: [AnimatedSpriteComponent],
      listen: {
        added: true,
      },
    },
  };

  // This method will get called on every frame by default
  public execute(delta: number, time: number): void {
      if ((this.queries.animatedSprites.added?.length ?? 0) > 0) {
      for (const entity of this.queries.animatedSprites.added!) {
        const component = entity.getMutableComponent(AnimatedSpriteComponent)!;

        this.app.stage.addChild(component.sprite);

        const transformComponent = entity.getComponent(TransformComponent);
        if (transformComponent != null) {
          component.sprite.position.set(
            transformComponent.position.x,
            transformComponent.position.y
          );
        }
      }
    }

    this.queries.animatedSprites.results.forEach((entity) => {
      const component = entity.getMutableComponent(AnimatedSpriteComponent)!;
      const transformComponent = entity.getComponent(TransformComponent);
      if (transformComponent != null) {
        component.sprite.position.set(
          transformComponent.position.x,
          transformComponent.position.y
        );
      }
    });
  }
}
