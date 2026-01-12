import type { ICoords } from 'src/game/types';

export interface IMovingBehaviorConfig {
  from: ICoords;
  to: ICoords;
  speed: ICoords;
}