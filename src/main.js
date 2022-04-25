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

        this.spikes = this.physics.add.group();
        this.blocks = this.physics.add.group();

        this.makeSpike(6,5);
        this.makeSpike(7,5);

        this.makeBlock(0,4,4,4);
        this.makeBlock(4,6,6,2);
        
        this.dood = this.physics.add.sprite(8,0,'dood').setOrigin(0,0);

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

        this.dood.anims.play('idle');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.dood, this.blocks);
        this.physics.add.collider(this.dood, this.spikes);
        
        this.cursors.space.on('down', () => {
            this.dood.anims.play('walk', true);
            this.dood.setVelocityX(10);
        });

    }

    makeSpike(i,j) {
        this.spikes.add(this.physics.add.sprite(8*i,8*j,'spike').setOrigin(0,0));
    }

    makeBlock(i,j,w,h) {
        this.blocks.add(this.physics.add.existing(this.add.tileSprite(8*i,8*j,8*w,8*h,'block').setOrigin(0,0)));
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