import { type IMovingBehaviorConfig } from "src/game/entities/Behavior";

export interface IEnemyConfig extends IMovingBehaviorConfig {
  player: any;
}