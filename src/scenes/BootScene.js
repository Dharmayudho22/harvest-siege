import { SCENE, TILE } from "../config/GameConfig";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.BOOT });
    }

    preload() {
        this._buatLoadingBar();

        this.load.spritesheet("player", "assets/sprites/Player.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("player_aksi", "assets/sprites/Player_Actions.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("musuh_rangka", "assets/sprites/Skeleton.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("musuh_slime", "assets/sprites/Slime_Green.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("rumah_warga", "assets/sprites/House.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("rumah_besar", "assets/sprites/House_1_Wood_Base_Blue.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        //masih ada untuk dekorasi dan rumput
    }

    create() {
        this._buatplaceholder();
        this.scene.start(SCENE.MAIN_MENU);
    }

    _buatLoadingBar() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.add.text(cx, cy - 60,  "HARVEST SIEGE", {
            fontFamily: "monospace",
            fontSize: "28px",
            color: "#e8d6a3",
            letterSpacing: 6,
        }).setOrigin(0,5);

        const barLatar = this.add.graphics();
        barLatar.fillStyle(0x333333, 1);
        barLatar.fillRoundedRect(cx - 160, cy - 10, 320, 20, 4);

        const barIsi = this.add.graphics();

        const textLoad = this.add.text(cx, cy + 24, "Memuat...", {
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#7a9e7e",
        }).setOrigin(0.5);

        this.load.on("progress", (nilai) => {
            barIsi.clear();
            barIsi.fillStyle(0x7a9e7e, 1);
            barIsi.fillRoundedRect(cx - 158, cy - 8, 316 * nilai, 16, 3);
            textLoad.setText(`Memuat... ${Math.floor(nilai * 100)}%`);
        });

        this.load.on("complete", () => {
            textLoad.setText("Siap!");
        });
    }

    
}