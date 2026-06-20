import Phaser, { Physics } from "phaser";
import { CANVAS, SCENES } from "./config/GameConfig";

import BootScene from "./scenes/bootscene.js";
import MainMenuScene from "./scenes/Mainmenuscene.js";
import GameScene from "./scenes/Gamescene.js";
import UIScene from "./scenes/Uiscene.js";
import GameOverScene from "./scenes/Gameoverscene.js";

const config = {
    type: Phaser.AUTO,
    width: CANVAS.WIDTH,
    height: CANVAS.HEIGHT,
    parent: "game-container",
    backgroundColor: "#1a1a2e",

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y:0 },
            debug: false,
        },
    },

    scene: [BootScene, MainMenuScene, GameScene, UIScene, GameOverScene],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
   },
};

const game = new Phaser.Game(config);
game.events.once(Phaser.Core.Events.READY, () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.classList.add("hidden");

        setTimeout(() => loadingScreen.remove(), 600);
    }
});

export default game;