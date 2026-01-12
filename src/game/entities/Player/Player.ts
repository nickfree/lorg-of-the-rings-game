import { Scene } from "phaser";
import { EventBus } from "../../EventBus";

export class Player {
  public player: any;
  public rings = 0;
  private cursors: any;
  public sound: any;

  constructor(scene: Scene, coords: { x: number, y: number }, sound: any) {
    this.player = scene.physics.add.sprite(
        coords.x,     // начальная X позиция
        coords.y,     // начальная Y позиция
        'player'      // ключ текстуры
    );

    // Настройка физики
    this.player.setCollideWorldBounds(true); // не выходит за границы мира
    this.player.setBounce(0.2);              // упругость
    this.player.setDrag(100);                // сопротивление движению
    this.player.setMaxVelocity(300);         // максимальная скорость

    // анимация
    scene.anims.create({
      key: 'r-move',
      frames: scene.anims.generateFrameNumbers('player-r-move', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'l-move',
      frames: scene.anims.generateFrameNumbers('player-l-move', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('player-r-move', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('player-r-move', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.rings = 0;

    this.sound = sound;
  }

  moveLeft() {
    this.player?.setVelocityX(-80);
    this.player?.anims.play('l-move', true);
  }

  moveRight() {
    this.player?.setVelocityX(80);
    this.player?.anims.play('r-move', true);
  }

  moveUp() {
    if (!this.player?.body.onFloor()) {
      return;
    }

    this.player?.setVelocityY(-200);
    this.player?.anims.play('jump', true);
    this.sound.playJumpSound();
  }

  stop() {
    this.player?.anims.stop();
    this.player?.anims.play('idle', true);
  }

  collect(ring: any) {
    ring.destroy();

    this.rings++;

    EventBus.emit('rings-collected', this.rings);

    this.sound.playCollectRingSound();

    if (this.rings === 6) {
      alert('You win');
    }
  }

  die() {
    this.rings = 0;

    alert('You are dead');
  }

  update() {
    if (this.cursors?.up.isDown) {
      this.moveUp();
    }
    
    if (this.cursors?.left.isDown) {
      this.moveLeft();
    }
    
    if (this.cursors?.right.isDown) {
      this.moveRight();
    }

    if (!this.cursors?.left.isDown && !this.cursors?.right.isDown) {
      this.stop();
    }
  }
}