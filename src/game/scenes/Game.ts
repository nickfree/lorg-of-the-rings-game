import { Scene } from 'phaser';
import { EventBus } from 'src/game/EventBus';
import { Player } from 'src/game/entities/Player';
import { Enemy } from 'src/game/entities/Enemy';
import { Sound } from 'src/game/entities/Sound';
import { MovingPlatform } from 'src/game/entities/MovingPlatform';

let player: Player;

export class Game extends Scene
{
    constructor () {
      super('Game');
    }

    preload () {
        this.load.setPath('assets');

        // загрузка карты
        this.load.tilemapTiledJSON('map', 'map.json'); // Загружаем карту
        this.load.image('tiles', 'tiles.png'); // Загружаем изображение тайлов
        this.load.image('tree', 'tree.png');
        this.load.image('ring', 'ring.png');
        this.load.image('buch', 'buch.png');
        this.load.image('bg', 'bg.jpeg');

        // загрузка персонажа
        this.load.image('player', 'player-r.png');

        // загрузка врага
        // this.load.image('enemy', 'goblin.png');
        this.load.spritesheet('enemy', 'goblin.png', {
            frameWidth: 22,
            frameHeight: 31,
            endFrame: 2
        });

        this.load.spritesheet('enemy-l', 'goblin-l.png', {
            frameWidth: 22,
            frameHeight: 31,
            endFrame: 2
        });

        // загрузка звуков
        this.load.audio('backgroundMusic', ['bg-sound.mp3']);
        this.load.audio('jump', ['jump.mp3']);
        this.load.audio('collect-ring', ['collect-ring.mp3']);
        
        this.load.spritesheet('player-r-move', 'player-r-move.png', {
            frameWidth: 22,
            frameHeight: 32,
            endFrame: 2
        });

        this.load.spritesheet('player-l-move', 'player-l-move.png', {
            frameWidth: 22,
            frameHeight: 32,
            endFrame: 2
        });
    }

    create () {
        // настройка карты
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tiles', 'tiles');
        const bgItemsTileset = map.addTilesetImage('tree', 'tree');
        
        this.add.image(600, 600, 'bg')
          .setScrollFactor(0.2)
          .setScale(2)
          .setAlpha(0.5);

        if (!tileset || !bgItemsTileset) {
          return;
        }

        const groundLayer = map.createLayer('map1', tileset, 0, 0);
        map.createLayer('map2', bgItemsTileset, 0, 0);

        // границы карты
        this.physics.world.setBounds(200, 0, 600, 600);

        // Создание персонажа
        player = new Player(this, { x: 300, y: 530 }, this.sound);

        // Камера
        this.cameras.main.setBounds(200, 0, 600, 600);
        this.cameras.main.startFollow(player.player, true, 0.05, 0.05);
        this.cameras.main.setZoom(4);

        // платформы земли
        const groundPlatforms = this.physics.add.staticGroup();

        groundLayer?.layer.data.forEach((tiles) => tiles.forEach((tile) => {
          if (!tile || tile.index === -1) {
            return;
          }
          
          const platform = groundPlatforms.create(tile.pixelX, tile.pixelY, 'platform');
          platform.alpha = 0;
          platform.width = tile.width;
          platform.height = tile.height;
          platform.setOrigin(0, 0); // важно для позиционирования
          platform.setScale(0.5, 0.5);
          platform.refreshBody(); // обновляем физическое тело
        }));

        // движущиеся платформы
        MovingPlatform.init(this.physics, this.physics.add.group({
            allowGravity: false,
            immovable: true
        }));

        new MovingPlatform({
          from: { x: 550, y: 530 },
          to: { x: 550, y: 400 },
          speed: { x: 0, y: 100 },
          player: player
        });

        new MovingPlatform({
          from: { x: 480, y: 430 },
          to: { x: 480, y: 200 },
          speed: { x: 0, y: 100 },
          player: player
        });

        // Коллизия с игроком
        this.physics.add.collider(player.player, [groundPlatforms, MovingPlatform.movingPlatforms]);

        // Предметы
        const items = map.createFromObjects('map3', {
          gid: 197, 
          key: 'ring',
        });

        items.forEach((item: any) => {
          // фикс неправильного смещения объектов
          item.setPosition(item.x + 520, item.y + 260);
          
          this.physics.add.existing(item, true);
          this.physics.add.overlap(player.player, item, (p: any, ring: any) => {
            player.collect(ring);
          });
        });

        // звуки
        const sound = new Sound(this.sound);
        player.sound = sound;
        sound.playBgMusic();


        // враги
        Enemy.init(this.physics, groundPlatforms, this);
        new Enemy({
          from: { x: 550, y: 130 },
          to: { x: 750, y: 130 },
          speed: { x: 50, y: 0 },
          player: player
        });
        
        
        EventBus.emit('current-scene-ready', this);
    }

    update() {
      player.update();
      MovingPlatform.update();
      Enemy.update();
    }
}
