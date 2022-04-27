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
        this.load.image('ded', 'assets/ded.png');
    }

    create() {

        this.spikes = this.physics.add.group({immovable: true});
        this.blocks = this.physics.add.group({immovable: true});

        this.makeSpike(6,6);
        this.makeSpike(7,6);

        this.makeBlock(0,0,10,1);
        this.makeBlock(0,5,4,3);
        this.makeBlock(4,7,6,1);
        
        
        this.dood = this.physics.add.sprite(8,0,'dood').setOrigin(0,0);
        this.inverted = false;
        this.dood.setGravityY(1);
        this.dood.setVelocityY(40);

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

        this.anims.create({
            key: 'dead',
            frames: [{key: 'ded', frame: 0}],
        });

        this.dood.anims.play('idle');

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.dood, this.blocks);
        this.physics.add.overlap(this.dood, this.spikes, (d,s) => {
            this.dood.setTint(0xFF0000);
            s.setTint(0xFF0000);
            this.stop();
            d.anims.play('dead');

            this.tweens.add({
                targets: this.dood,
                alpha: 0,
                duration: 250
            });

            this.time.delayedCall(500, () => this.scene.restart());
        });
        
        this.cursors.left.on('down', () => this.walk(-1));
        this.cursors.right.on('down', () => this.walk(+1));

        this.cursors.left.on('up', () => this.stop());
        this.cursors.right.on('up', () => this.stop());
    }

    walk(sign) {
        this.dood.anims.play('walk', true);
        this.dood.setVelocityX(sign*40);
    }

    stop() {
        this.dood.anims.play('idle');
        this.dood.setVelocityX(0);
    }

    update() {
        if(!this.inverted && !this.dood.body.touching.down) {
            this.fall(+1);
        }

        if(this.inverted && !this.dood.body.touching.up) {
            this.fall(-1);
        }
        
        if(!this.dood.body.touching.none) {
            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.inverted = !this.inverted;
            }
        }
    }

    fall(sign) {
        this.dood.setGravityY(sign*1e-9);
        this.dood.setVelocityY(sign*40);
        this.dood.flipY = this.inverted;
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
            debug: false
        }
    }
});