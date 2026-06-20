import Phaser from "phaser";
import { SCENES, COLORS } from "../config/GameConfig.js";

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.MAIN_MENU });
    }

    create() {
        const { width, height } = this.scale;
        const cx = width / 2;

        this.cameras.main.setBackgroundColor("#1a3a1a");

        this.add.text(cx, 160, "HARVEST SIEGE", {
            fontFamily: "monospace",
            fontSize: "36px",
            color: "#e8d5a3",
            stroke: "#3a2a00",
            strokeThickness: 4,
            letterSpacing: 4,
        }).setOrigin(0.5);

        this.add.text(cx, 210, "Bertani disiang hari. Bertahan di malam hari.", {
            fontFamily: "monospace",
            fontSize: "12px",
            color:"#7a9e7e", 
        }).setOrigin(0.5);

        this.add.image(cx, 300, "player", 0).setScale(4);

        const tombolMulai = this.add.text(cx, 400, "[ MULAI BERMAIN ]", {
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#fdd835",
            stroke: "#5a4a00",
            strokeThickness: 3,
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: tombolMulai,
            alpha: 0.3,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        tombolMulai.on("pointerdown", () => this._mulaiGame());

        this.input.keyboard.once("keydown-ENTER", () => this._mulaiGame());
        this.input.keyboard.once("keydown-SPACE", () => this._mulaiGame());

        tombolMulai.on("pointerover", () => tombolMulai.setColor("#ffffff"));
        tombolMulai.on("pointerout", () => tombolMulai.setColor("#fdd835"));

        this.add.text(8, height - 16, "v0.1.0 - MVP", {
            fontFamily: "monospace",
            fontSize: "10px",
            color: "#444444",
        }).setOrigin(0.1);
    }

    _mulaiGame() {
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start(SCENES.GAME);
        });
    }
}