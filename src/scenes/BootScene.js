import Phaser from "phaser";
import { SCENES, TILE } from "../config/GameConfig.js";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.BOOT });
    }

    preload() {
        this._buatLoadingBar();

        this.load.spritesheet("player", "assets/sprites/Player.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("player_aksi", "assets/sprites/Player_Actions.png", {
            frameWidth: 48,
            frameHeight: 48,
        });

        this.load.spritesheet("musuh_rangka", "assets/sprites/Skeleton.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("musuh_slime", "assets/sprites/Slime_Green.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("rumah_warga", "assets/sprites/House_1_Wood_Base_Blue.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("rumah_besar", "assets/sprites/House_1_Wood_Base_Blue.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("pagar", "assets/sprites/Fences.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        //masih ada untuk dekorasi dan rumput
    }

    create() {
        this._buatplaceholder();
        this.scene.start(SCENES.MAIN_MENU);
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

    _buatplaceholder() {
        this._buatTexture("musuh_penyihir", 22, 28, (g) => {
        g.fillStyle(0x7b1fa2, 1);
        g.fillRect(0, 8, 22, 20);
        g.fillStyle(0x9c27b0, 1);
        g.fillTriangle(11, 0, 0, 10, 22, 10);
        g.fillStyle(0xce93d8, 1);
        g.fillRect(6, 14, 10, 6);
        });
    
        // ── TERRAIN (belum ada file) ─────────────────────────────
        this._buatTexture("rumput", TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x558b2f, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.fillStyle(0x689f38, 0.4);
        g.fillRect(4, 4, 10, 10);
        g.fillRect(18, 14, 8, 8);
        });
    
        this._buatTexture("jalan", TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0xa1887f, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        });
    
        // ── TANAH LADANG (plot kebun kosong) ─────────────────────
        this._buatTexture("tanah_ladang", TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x8d6e63, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.lineStyle(1, 0x6d4c41, 1);
        g.strokeRect(1, 1, TILE.SIZE - 2, TILE.SIZE - 2);
        });
    
        // ── TANAH BASAH (sudah disiram) ──────────────────────────
        this._buatTexture("tanah_basah", TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x4e342e, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.lineStyle(1, 0x3e2723, 1);
        g.strokeRect(1, 1, TILE.SIZE - 2, TILE.SIZE - 2);
        });
    
        // ── TANAMAN (4 jenis × 3 stage) ─────────────────────────
        this._buatTanamanTexture("wortel", 0xff7043);
        this._buatTanamanTexture("cabai",  0xe53935);
        this._buatTanamanTexture("labu",   0xfb8c00);
        this._buatTanamanTexture("bambu",  0x7cb342);
    
        // ── PELURU ───────────────────────────────────────────────
        this._buatTexture("peluru", 10, 10, (g) => {
        g.fillStyle(0xffeb3b, 1);
        g.fillCircle(5, 5, 5);
        });
    
        this._buatTexture("peluru_api", 12, 12, (g) => {
        g.fillStyle(0xff5722, 1);
        g.fillCircle(6, 6, 6);
        g.fillStyle(0xffeb3b, 0.7);
        g.fillCircle(6, 6, 3);
        });
    
        // ── IKON HUD ─────────────────────────────────────────────
        this._buatTexture("ikon_nyawa", 16, 16, (g) => {
        g.fillStyle(0xe53935, 1);
        g.fillCircle(5, 6, 5);
        g.fillCircle(11, 6, 5);
        g.fillTriangle(8, 15, 1, 7, 15, 7);
        });
    
        this._buatTexture("ikon_siang", 20, 20, (g) => {
        g.fillStyle(0xfdd835, 1);
        g.fillCircle(10, 10, 7);
        g.lineStyle(2, 0xfdd835, 1);
        for (let i = 0; i < 8; i++) {
            const sudut = (i * Math.PI * 2) / 8;
            g.lineBetween(
            10 + Math.cos(sudut) * 9,  10 + Math.sin(sudut) * 9,
            10 + Math.cos(sudut) * 12, 10 + Math.sin(sudut) * 12
            );
        }
        });
    
        this._buatTexture("ikon_malam", 20, 20, (g) => {
        g.fillStyle(0x90caf9, 1);
        g.fillCircle(11, 10, 8);
        g.fillStyle(0x1a1a2e, 1);
        g.fillCircle(15, 8, 7);
        });
    }
    
    // ─── HELPER: 3 stage tanaman sekaligus ───────────────────
    _buatTanamanTexture(nama, warna) {
        this._buatTexture(`${nama}_benih`, TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x5d4037, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.fillStyle(warna, 0.5);
        g.fillCircle(TILE.SIZE / 2, TILE.SIZE / 2, 4);
        });
    
        this._buatTexture(`${nama}_tumbuh`, TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x5d4037, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.fillStyle(warna, 0.75);
        g.fillRect(13, 12, 6, 14);
        g.fillCircle(16, 10, 6);
        });
    
        this._buatTexture(`${nama}_siap`, TILE.SIZE, TILE.SIZE, (g) => {
        g.fillStyle(0x5d4037, 1);
        g.fillRect(0, 0, TILE.SIZE, TILE.SIZE);
        g.fillStyle(warna, 1);
        g.fillRect(10, 6, 12, 20);
        g.fillCircle(16, 5, 8);
        g.fillStyle(0xffffff, 0.6);
        g.fillCircle(20, 4, 3);
        });
    }
    
    // ─── HELPER: buat texture dari Graphics ──────────────────
    _buatTexture(key, w, h, gambFn) {
        if (this.textures.exists(key)) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        gambFn(g);
        g.generateTexture(key, w, h);
        g.destroy();
    }
}