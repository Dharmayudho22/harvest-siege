// ─── CANVAS ──────────────────────────────────────────────────
export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 600,
};

// ─── TILE ────────────────────────────────────────────────────
export const TILE = {
  SIZE: 32,         // ukuran satu tile dalam pixel
  MAP_COLS: 40,     // lebar peta dalam tile
  MAP_ROWS: 40,     // tinggi peta dalam tile
};

// ─── WAKTU (dalam milidetik) ──────────────────────────────────
export const TIME = {
  DAY_DURATION: 120_000,    // durasi fase siang: 2 menit
  TRANSITION_DURATION: 3_000, // durasi animasi transisi siang↔malam
};

// ─── PLAYER ──────────────────────────────────────────────────
export const PLAYER = {
  SPEED: 180,           // pixel per detik
  MAX_HP: 100,
  DODGE_SPEED: 400,     // kecepatan saat dodge roll
  DODGE_DURATION: 200,  // durasi invincibility frame (ms)
  DODGE_COOLDOWN: 800,  // cooldown dodge (ms)
  PROJECTILE_SPEED: 350,
  PROJECTILE_RANGE: 400, // jarak maksimal projectile (px)
};

// ─── DESA ─────────────────────────────────────────────────────
export const VILLAGE = {
  MAX_HP: 200,
  INITIAL_PLOT_COUNT: 4,      // plot kebun awal
  PLOT_UNLOCK_INTERVAL: 3,    // unlock +2 plot setiap N malam
  PLOT_UNLOCK_AMOUNT: 2,
  MAX_PLOTS: 12,
};

// ─── TANAMAN ─────────────────────────────────────────────────
// growDays: hari dalam game hingga siap panen
// yield: jumlah item yang dihasilkan saat panen
// combatUse: kegunaan saat fase malam
export const CROPS = {
  carrot: {
    key: "carrot",
    label: "Wortel",
    growDays: 1,
    yield: 3,
    combatUse: "heal",     // +10 HP ke pemain
    combatValue: 10,
    color: 0xff7043,
  },
  chili: {
    key: "chili",
    label: "Cabai",
    growDays: 2,
    yield: 5,
    combatUse: "projectile_fire", // projectile fire
    combatValue: 15,
    color: 0xe53935,
  },
  pumpkin: {
    key: "pumpkin",
    label: "Labu",
    growDays: 3,
    yield: 1,
    combatUse: "trap",     // pasang jebakan di tanah
    combatValue: 30,
    color: 0xfb8c00,
  },
  bamboo: {
    key: "bamboo",
    label: "Bambu",
    growDays: 2,
    yield: 4,
    combatUse: "barricade", // pasang pagar sementara
    combatValue: 0,
    color: 0x7cb342,
  },
};

// ─── MUSUH ────────────────────────────────────────────────────
export const ENEMIES = {
  goblin: {
    key: "goblin",
    label: "Goblin Kecil",
    hp: 20,
    speed: 120,
    damage: 10,        // damage ke desa per hit
    dropItem: "wood",
    dropAmount: 1,
    scoreValue: 10,
    unlockNight: 1,    // mulai muncul malam ke berapa
  },
  troll: {
    key: "troll",
    label: "Troll Batu",
    hp: 80,
    speed: 55,
    damage: 30,
    dropItem: "stone",
    dropAmount: 2,
    scoreValue: 30,
    unlockNight: 2,
  },
  wizard: {
    key: "wizard",
    label: "Penyihir",
    hp: 40,
    speed: 70,
    damage: 15,
    dropItem: "book",
    dropAmount: 1,
    scoreValue: 25,
    unlockNight: 3,
  },
};

// ─── WAVE / DIFFICULTY SCALING ────────────────────────────────
export const WAVE = {
  BASE_ENEMY_COUNT: 5,         // jumlah musuh di malam pertama
  ENEMY_COUNT_INCREMENT: 1,   // tambah N musuh setiap malam
  HP_SCALE_PER_NIGHT: 0.15,   // HP musuh naik 15% per malam
  SPAWN_INTERVAL: 2000,        // jeda spawn antar musuh (ms)
  // Arah spawn musuh (dari 4 tepi peta)
  SPAWN_DIRECTIONS: ["top", "bottom", "left", "right"],
};

// ─── SCENES ──────────────────────────────────────────────────
// Daftar key scene untuk referensi antar file
export const SCENES = {
  BOOT: "BootScene",
  MAIN_MENU: "MainMenuScene",
  GAME: "GameScene",
  UI: "UIScene",
  GAME_OVER: "GameOverScene",
};

// ─── EVENTS ──────────────────────────────────────────────────
// Custom event keys untuk komunikasi antar scene
export const EVENTS = {
  DAY_STARTED: "day-started",
  NIGHT_STARTED: "night-started",
  WAVE_CLEARED: "wave-cleared",
  PLAYER_HP_CHANGED: "player-hp-changed",
  VILLAGE_HP_CHANGED: "village-hp-changed",
  INVENTORY_CHANGED: "inventory-changed",
  CROP_HARVESTED: "crop-harvested",
  GAME_OVER: "game-over",
};

// ─── DEPTH / LAYER ORDER ──────────────────────────────────────
// Semakin tinggi angka = semakin depan tampil
export const DEPTH = {
  GROUND: 0,
  CROPS: 10,
  ITEMS: 15,
  ENEMIES: 20,
  PLAYER: 30,
  PROJECTILES: 40,
  PARTICLES: 50,
  UI: 100,
};

// ─── WARNA ───────────────────────────────────────────────────
export const COLORS = {
  DAY_SKY: 0x87ceeb,
  NIGHT_SKY: 0x0d1b2a,
  DAY_AMBIENT: 0xfff9e6,
  NIGHT_AMBIENT: 0x1a2744,
  HP_FULL: 0x4caf50,
  HP_LOW: 0xe53935,
  VILLAGE_HP: 0x1565c0,
};