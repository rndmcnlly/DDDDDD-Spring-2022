class Playground extends Phaser.Scene {
    constructor() {
        super("playground");
    }

    preload() {
        this.load.image('spike', 'assets/spike.png');
        this.load.image('block', 'assets/block.png');
        this.load.spritesheet('dood', 'assets/dood.png', {
            frameWidth: 10,
            frameHeight: 16
        });
    }

    create() {
        this.add.sprite(0,0,'spike').setOrigin(0,0);
        this.add.sprite(0,8,'block').setOrigin(0,0);
        let dood = this.add.sprite(8,0,'dood').setOrigin(0,0);

        this.anims.create({
            key: 'walk',
            frames: 'dood',
            frameRate: 10,
            repeat: -1
        });

        dood.anims.play('walk');

    }
}

let game = new Phaser.Game({
    width: 80,
    height: 60,
    zoom: 4,
    scene: [Playground]
});