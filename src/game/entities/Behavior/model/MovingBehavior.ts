import type { ICoords } from 'src/game/types';
import type { IMovingBehaviorConfig } from '../types';

export class MovingBehavior {
  private from: ICoords;
  private to: ICoords;
  private speed: ICoords;
  public direction: {
    x: 'to' | 'from';
    y: 'to' | 'from';
  }

  private coords: ICoords;

  private get velocitySign() {
    return {
      x: this.from.x < this.to.x ? 1 : -1,
      y: this.from.y < this.to.y ? 1 : -1
    };
  }

  constructor(config: IMovingBehaviorConfig) {
    this.from = config.from;
    this.to = config.to;
    this.speed = config.speed;

    this.direction = {
      x: 'to',
      y: 'to',
    }
  }

  private toggleDirection() {
    this.direction.x = this.direction.x === 'to' ? 'from' : 'to';
    this.direction.y = this.direction.y === 'to' ? 'from' : 'to';
  }

  public setCoords(coords: ICoords) {
    this.coords = coords;
  }
  
  public getVelocity() {
    const velocity: ICoords = {
      x: 0,
      y: 0
    };

    if (
      (
        (this.from.x === this.to.x) &&
        (
          (
            (this.velocitySign.y < 0 && this.direction.y == 'to' && this.coords.y <= this.to.y) ||
            (this.velocitySign.y > 0 && this.direction.y == 'to' && this.coords.y >= this.to.y)
          ) ||
          (
            (this.velocitySign.y < 0 && this.direction.y == 'from' && this.coords.y >= this.from.y) ||
            (this.velocitySign.y > 0 && this.direction.y == 'from' && this.coords.y <= this.from.y)
          )
        )
      ) ||
      (
        (this.from.y === this.to.y) &&
        (
          (
            (this.velocitySign.x < 0 && this.direction.x == 'to' && this.coords.x <= this.to.x) ||
            (this.velocitySign.x > 0 && this.direction.x == 'to' && this.coords.x >= this.to.x)
          ) ||
          (
            (this.velocitySign.x < 0 && this.direction.x == 'from' && this.coords.x >= this.from.x) ||
            (this.velocitySign.x > 0 && this.direction.x == 'from' && this.coords.x <= this.from.x)
          )
        )
      )
    ) {
      this.toggleDirection();
    }

    if (this.direction.y === 'to') {
      velocity.y = this.velocitySign.y * this.speed.y;
    } else {
      velocity.y = -this.velocitySign.y * this.speed.y;
    }

    if (this.direction.x === 'to') {
      velocity.x = this.velocitySign.x * this.speed.x;
    } else {
      velocity.x = -this.velocitySign.x * this.speed.x;
    }

    return velocity;
  }
}