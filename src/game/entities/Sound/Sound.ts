export class Sound {
  private bgMusic: any;
  private jumpSound: any;
  private collectRingSound: any;

  constructor(sound: any) {
    this.bgMusic = sound.add('backgroundMusic', 'bg-sound.mp3', { loop: true });
    this.jumpSound = sound.add('jump', 'jump.mp3');
    this.collectRingSound = sound.add('collect-ring', 'collect-ring.mp3');
  }

  playBgMusic() {
    this.bgMusic.play();
  }

  playJumpSound() {
    this.jumpSound.play();
  }

  playCollectRingSound() {
    this.collectRingSound.play();
  }
}