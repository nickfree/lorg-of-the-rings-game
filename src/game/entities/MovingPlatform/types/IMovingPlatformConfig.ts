import { type IMovingBehaviorConfig } from "src/game/entities/Behavior";

export interface IMovingPlatformConfig extends IMovingBehaviorConfig {
  player: any;
}