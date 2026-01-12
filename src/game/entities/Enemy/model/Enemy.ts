import { Scene } from "phaser";
import type { ICoords } from "src/game/types";
import { MovingBehavior } from "src/game/entities/Behavior";
import { IEnemyConfig } from "../types";

export class Enemy {
  public static enemies: any;
  public static physics: any;
  public static groundPlatforms: any;

  public static enemiesGroup: any[] = [];

  public static update() {
    this.enemiesGroup.forEach((enemy) => {
      enemy.update();
    });
  }

  public static init(physics: any, groundPlatforms: any, scene: Scene) {
    this.groundPlatforms = groundPlatforms;
    this.physics = physics;

    this.enemies = this.physics.add.group();

    scene.anims.create({
      key: 'enemy-r-move',
      frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'enemy-l-move',
      frames: scene.anims.generateFrameNumbers('enemy-l', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
  };

  public enemy: any;
  private movingBehavior: MovingBehavior;

  constructor(config: IEnemyConfig) {
    this.movingBehavior = new MovingBehavior(config);

    this.enemy = Enemy.enemies.create(config.from.x, config.from.y);
    this.enemy.setCollideWorldBounds(true);
    
    Enemy.physics.add.collider(this.enemy, [Enemy.groundPlatforms]);

    this.enemy.anims.play('enemy-r-move', true);
    Enemy.enemiesGroup.push(this);

    Enemy.physics.add.overlap(config.player.player, this.enemy, () => {
      config.player.die();
    });
  }

  public update() {
    if (!this.enemy) {
      return;
    }

    this.movingBehavior.setCoords(this.enemy);
    
    const velocity = this.movingBehavior.getVelocity();

    this.enemy.setVelocityX(velocity.x);

    if (this.movingBehavior.direction.x === 'to') {
      this.enemy.anims.play('enemy-r-move', true);
    } else {
      this.enemy.anims.play('enemy-l-move', true);
    }
  }
}