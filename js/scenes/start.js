var basicenemies;
var enemysquare;
var enemytriangle;
var startBtn;
var swarm;
var blocks;
var blocks_2;
var core;
var core_2;
var logoBorder;
var logoTxt;
var ccontrols;
var llevels;
var pplay;
var credits;

class StartScene extends Phaser.Scene {
    constructor(){
        super("StartScene");
    }

    create(){

    logoBorder = this.physics.add.staticImage(400,300, "logoBorder").setScale(1);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.C = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    //GROUP FOR GENERATING SQUARE ENEMIES
    enemysquare = this.physics.add.group({       
    collideWorldBounds: true,
    bounceX: 1,
    bounceY:1, 
    });
        
    //GROUP FOR GENERATING TRIANGLE ENEMIES
    enemytriangle = this.physics.add.group({
                collideWorldBounds: true,
                bounceX: 1,
                bounceY: 1
    });

    //CREATES CORE(S) FOR BLOCK SWARM
    core = this.physics.add.sprite(100, 500, "core");
    core.body.collideWorldBounds = true;
    core.setBounce(1);
    core.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));

    core_2 = this.physics.add.sprite(700, 500, "core");
    core_2.body.collideWorldBounds = true;
    core_2.setBounce(1);
    core_2.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));

    //CREATES GROUP(S) OF BLOCKS FOR THE SWARM
    blocks = this.physics.add.group({
        key: "gsquare",
        frameQuantity: 10,
        collideWorldBounds: true,
        bounceX: 1,
        bounceY: 1
    });

    blocks_2 = this.physics.add.group({
        key: "gsquare",
        frameQuantity: 10,
        collideWorldBounds: true,
        bounceX: 1,
        bounceY: 1
    });

    basicenemies = new enemy();
    basicenemies.enemies(Phaser.Math.Between(7, 17), enemysquare, 50, 30, "enemysquare");
    basicenemies.enemies(Phaser.Math.Between(7, 17), enemytriangle, 400, 70, "enemytriangle");
    swarm = new enemy();
    logoTxt = this.physics.add.staticImage(400,300, "logoTxt").setScale(1);
    this.scene.bringToTop(logoTxt);
    ccontrols = this.physics.add.staticImage(250, 550, "controls").setScale(1);
    this.scene.bringToTop(ccontrols);
    llevels = this.physics.add.staticImage(400, 550, "levels").setScale(1);
    this.scene.bringToTop(llevels);
    pplay = this.physics.add.staticImage(400, 500, "play").setScale(1);
    this.scene.bringToTop(pplay);
    credits = this.physics.add.staticImage(550, 550, "credits").setScale(1);
    this.scene.bringToTop(credits);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.P)) {
            console.log('Start create');
            this.scene.start('PlayScene1');
        };
        if(Phaser.Input.Keyboard.JustDown(this.L)) {
            console.log('Start create');
            this.scene.start('LevelsScene');
        };
        if(Phaser.Input.Keyboard.JustDown(this.C)) {
            console.log('Start create');
            this.scene.start('CreditsScene');
        };
        if(Phaser.Input.Keyboard.JustDown(this.X)) {
            console.log('Start create');
            this.scene.start('ControlsScene');
        };
        swarm.swarmblocks(core, blocks);
        swarm.swarmblocks(core_2, blocks_2);

        //ROTATES THE BODIES OF BASIC ENEMIES
        Phaser.Actions.Rotate(enemysquare.getChildren(),0.002, 0.009);
        Phaser.Actions.Rotate(enemytriangle.getChildren(),0.002, 0.009);
        Phaser.Actions.Rotate(blocks.getChildren(),0.002, 0.005);
        Phaser.Actions.Rotate(blocks_2.getChildren(),0.002, 0.005);
    }
};
