import { Entity } from 'ecsy';
import { LayerComponent } from '../components/LayerComponent';

export class LayerComponentComparator {
    public static compare(a: Entity, b: Entity): number {
        const aLayered = a.getComponent(LayerComponent);
        const bLayered = b.getComponent(LayerComponent);
        if (!aLayered || !bLayered) {
            return 0;
        }

        return aLayered.layer - bLayered.layer;
    }
}