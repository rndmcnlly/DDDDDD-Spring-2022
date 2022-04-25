class Playground extends Phaser.Scene {
    constructor() {
        super("playground");
    }

    create() {
        this.add.rectangle(0,0,8,8,0xFF0000);
    }
}

let game = new Phaser.Game({
    width: 80,
    height: 60,
    zoom: 4,
    scene: [Playground]
});