import Phaser from "phaser";
import { Tilemaps } from "phaser";
import { SCENES, PLAYER, CANVAS, TILE } from "../config/GameConfig.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.GAME });
    }

    create() {
        const lebarDunia = TILE.MAP_COLS * TILE.SIZE;
        const tinggiDunia = TILE.MAP_ROWS * TILE.SIZE;

        const latar = this.add.graphics();
        latar.fillStyle(0x3a7d3a, 1);
        latar.fillRect(0, 0, lebarDunia, tinggiDunia);
    
        // Garis grid tipis biar kelihatan ada sesuatu
        latar.lineStyle(0.5, 0x2d612d, 0.4);
        for (let x = 0; x <= lebarDunia; x += TILE.SIZE) {
            latar.lineBetween(x, 0, x, tinggiDunia);
        }
        for (let y = 0; y <= tinggiDunia; y += TILE.SIZE) {
            latar.lineBetween(0, y, lebarDunia, y);
        }

        for (let baris = 0; baris < TILE.MAP_ROWS; baris++) {
            for (let kolom = 0; kolom < TILE.MAP_COLS; kolom++) {
                this.add.image(kolom * TILE.SIZE, baris * TILE.SIZE, "rumput").setOrigin(0, 0);
            }
        }

        this._gambarRumah(300, 300);
        this._gambarRumah(600, 250);
        this._gambarRumah(900, 350);

        this._gambarPagar(200, 200, 800, 600);

        this.player = this.physics.add.sprite(lebarDunia / 2, tinggiDunia / 2, "player", 0)
        .setScale(2).setCollideWorldBounds(true);

        this.physics.world.setBounds(0, 0, lebarDunia, tinggiDunia);

        this.cameras.main.setBounds(0, 0, lebarDunia, tinggiDunia);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        //coba debug
        this.cameras.main.setBackgroundColor("#1a3d1a");

        this.kursor = this.input.keyboard.addKeys({
            atas: Phaser.Input.Keyboard.KeyCodes.W,
            bawah: Phaser.Input.Keyboard.KeyCodes.S,
            kiri: Phaser.Input.Keyboard.KeyCodes.A,
            kanan: Phaser.Input.Keyboard.KeyCodes.D,
            
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });

        this.textDebug = this.add.text (8, 8, "", {
            fontFamily: "monospace",
            fontSize: "10px",
            color: "#ffffff",
            backgroundColor: "#00000088",
            padding: { x: 4, y: 2 },
        }).setScrollFactor(0).setDepth(100);

        this.cameras.main.fadeIn(400);
    }

    update() {
        this._gerakanPlayer();
        this._updateDebug();
    }

    _gambarRumah(x, y) {
        const fs = 32;
        const kolomFrame = 3;
        const barisFrame = 4;

        for (let baris = 0; baris < barisFrame; baris++) {
            for (let kolom = 0; kolom < kolomFrame; kolom++) {
                const nomorFrame = baris * kolomFrame + kolom;
                this.add.image( 
                    x + kolom * fs,
                    y + baris * fs,
                    "rumah_warga",
                    nomorFrame
                ).setOrigin(0, 0).setDepth(10);
            }
        }
    }

    _gambarPagar(x1, y1, x2, y2) {
        const g = this.add.graphics().setDepth(5);
        const lebar = x2 - x1;
        const tinggi = y2 - y2;
        const tebal = 6;
        const warna = 0x8b5e3c;
        const warnaGelap = 0x5c3d1e;

        g.fillStyle(warna, 1);
        g.fillRect(x1, y1, lebar, tebal);          
        g.fillRect(x1, y2 - tebal, lebar, tebal);  
        g.fillRect(x1, y1, tebal, tinggi);          
        g.fillRect(x2 - tebal, y1, tebal, tinggi);

        g.fillStyle(warnaGelap, 1);
        for (let x = x1; x <= x2; x += 32) {
            g.fillRect(x - 3, y1 - 4, 8, tebal + 8);
            g.fillRect(x - 3, y2 - tebal - 4, 8, tebal + 8);
        }

        for (let y = y1; y <= y2; y += 32) {
            g.fillRect(x1 - 4, y - 3, tebal + 8, 8);
            g.fillRect(x2 - tebal - 4, y - 3, tebal + 8, 8);
        }

        g.fillStyle(0xc8864a, 0.5);
        g.fillRect(x1, y1, lebar, 2);
        g.fillRect(x1, y2 - tebal, lebar, 2);
        g.fillRect(x1, y1, 2, tinggi);
        g.fillRect(x2 - tebal, y1, 2, tinggi);
    }

    _gerakanPlayer() {
        const k = this.kursor;
        let vx = 0;
        let vy = 0;

        if (k.kiri.isDown || k.left.isDown) vx = -PLAYER.SPEED;
        if (k.kanan.isDown || k.right.isDown) vx = PLAYER.SPEED;
        if (k.atas.isDown || k.up.isDown) vy = -PLAYER.SPEED;
        if (k.bawah.isDown || k.down.isDown) vy = PLAYER.SPEED;
        
        if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
        }

        this.player.setVelocity(vx, vy);

        if (vx === 0 && vy === 0) {
            this.player.setFrame(0);
        } else {
            this.player.setFrame(
                Math.floor(this.time.now / 200) % 4 === 0 ? 0 : 1
            );
        }
    }

    _updateDebug() {
        const px = Math.floor(this.player.x);
        const py = Math.floor(this.player.y);
        this.textDebug.setText(`Posisi: ${px}, ${py}`);
    }
}