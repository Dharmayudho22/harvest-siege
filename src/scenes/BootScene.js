import { SCENES, COLORS, TILE } from "../config/GameConfig";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.BOOT });
    }

    preload() {
        this._createLoadingBar();
    }

    create() {
        this._generatePlaceholder();
        this.scane.start(SCENES.MAIN_MENU);
    }

    _createLoadingBar() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.add.text (
            cx, cy - 60, "HARVEST SIEGE", {
                fontFamily: "monospace",
                fontSize: "28px",
                color: "#e8d5a3",
                letterSpacing: 6,
            }
        ).setOrigin(0.5);

        const barBg = this.add.graphics();
        barBg.fillStyle(0x333333, 1);
        barBg.fillRoundedRect(cx - 160, cy - 10, 320, 20, 4);

        const barFill = this.add.graphics();

        const loadText = this.add.text(
            cx, cy + 24, "Loading...", {
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#7a9e7e",
            }
        ).setOrigin(0.5);

        this.load.on("progress", (value) => {
            barFill.clear();
            barFill.fillStyle(0x7a9e7e, 1);
            barFill.fillRoundedRect(cx - 158, cy - 8, 316 * value, 16, 3);
            loadText.setText(`Loading... ${Math.floor(value * 100)}%`);
        });

        this.load.on("complete", () => {
            loadText.setText("Done!");
        });
    }

    _generatePlaceholder() {
        this._makeTexture("player", 24, 24, (g) => {
            g.fillStyle(0x42a5f5, 1);
            g.fillReact(0, 0, 24, 24);
            g.fillStyle(0xffffff, 1);

            g.fillTriangle(12, 2, 4, 18, 20, 18);
        });

        
    }
}