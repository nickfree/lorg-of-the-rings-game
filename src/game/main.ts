import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainGame
    ],
    physics: { // <--- This enables the physics system
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 }, // Optional: adds gravity
            debug: false // Optional: shows physics bodies for debugging
        }
    },
    render: {
        pixelArt: true, // Отключает сглаживание для всей игры
        antialias: false,
        antialiasGL: false
    }
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
