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
        let spike = this.physics.add.sprite(30,0,'spike').setOrigin(0,0);
        let block = this.physics.add.sprite(40,8,'block').setOrigin(0,0);
        let dood = this.physics.add.sprite(8,0,'dood').setOrigin(0,0);

        this.anims.create({
            key: 'walk',
            frames: 'dood',
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{key: 'dood', frame: 0}],
        });

        dood.anims.play('idle');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(dood, block);
        this.physics.add.collider(dood, spike);
        
        this.cursors.space.on('down', () => {
            dood.anims.play('walk', true);
            dood.setVelocityX(10);
        });

    }
}

let game = new Phaser.Game({
    width: 80,
    height: 60,
    zoom: 4,
    scene: [Playground],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
});