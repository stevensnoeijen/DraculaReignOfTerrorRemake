import { Level } from "./levels/Level";

export interface LevelLoadedEvent {
    level: Level;
}

export type Events = LevelLoadedEvent;