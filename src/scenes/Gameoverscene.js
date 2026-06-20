import Phaser from "phaser";
import { SCENES } from "../config/GameConfig.js";
 
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME_OVER });
  }
 
  create() {
    const { width, height } = this.scale;
    const cx = width / 2;
 
    this.cameras.main.setBackgroundColor("#0d0d0d");
 
    this.add.text(cx, height / 2 - 40, "GAME OVER", {
        fontFamily: "monospace",
        fontSize: "32px",
        color: "#e53935",
      }).setOrigin(0.5);
 
    const ulang = this.add.text(cx, height / 2 + 30, "[ MAIN LAGI ]", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#fdd835",
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
 
    ulang.on("pointerdown", () => this.scene.start(SCENES.MAIN_MENU));
 
    this.tweens.add({
      targets: ulang,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });
  }
}