import { IMovingPlatformConfig } from "../types";
import type { ICoords } from "src/game/types";
import { MovingBehavior } from "src/game/entities/Behavior";

export class MovingPlatform {
  public static movingPlatforms: any;
  public static physics: any;
  public static platforms: any[] = [];

  public static init(physics: any, movingPlatforms: any) {
    MovingPlatform.movingPlatforms = movingPlatforms;
    MovingPlatform.physics = physics;
  }

  public static update() {
    MovingPlatform.platforms.forEach((platform) => {
      platform.update();
    });
  }

  // поля и методы экземпляра
  public platform: any;
  private movingBehavior: MovingBehavior;

  constructor(config: IMovingPlatformConfig) {
    this.movingBehavior = new MovingBehavior(config);

    this.platform = MovingPlatform.movingPlatforms.create(config.from.x, config.from.y, 'buch');

    MovingPlatform.platforms.push(this);
  }

  public update() {
    this.movingBehavior.setCoords(this.platform);
    
    const velocity = this.movingBehavior.getVelocity();

    this.platform.setVelocityY(velocity.y);
  }
}