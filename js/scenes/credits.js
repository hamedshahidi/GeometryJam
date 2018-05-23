var corre;
var blocks;
var B
var hamed;
var vladimir;


class CreditsScene extends Phaser.Scene {
    constructor(){
        super("CreditsScene");
    }

    create()
    {
        this.B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
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
    
        basicenemies = new enemy();
        basicenemies.enemies(Phaser.Math.Between(7, 17), enemysquare, 50, 30, "enemysquare");
        basicenemies.enemies(Phaser.Math.Between(7, 17), enemytriangle, 400, 70, "enemytriangle");

        //CREATES CORE(S) FOR BLOCK SWARM
        core = this.physics.add.sprite(Phaser.Math.Between(120, 680), Phaser.Math.Between(100, 500), "core");
        core.body.collideWorldBounds = true;
        core.setBounce(1);
        core.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));

        //CREATES GROUP(S) OF BLOCKS FOR THE SWARM
        blocks = this.physics.add.group({
        key: "gsquare",
        frameQuantity: 10,
        collideWorldBounds: true,
        bounceX: 1,
        bounceY: 1
        });

        swarm = new enemy();

        hamed = this.physics.add.sprite(250,300, "hamed").setScale(1);
        this.scene.bringToTop(hamed);
        hamed.body.collideWorldBounds = true;
        hamed.setBounce(1);
        hamed.setVelocity(Phaser.Math.Between(-40, 40), Phaser.Math.Between(-50, 50));
        
        vladimir = this.physics.add.sprite(550,300, "vladimir").setScale(1);
        this.scene.bringToTop(vladimir);
        vladimir.body.collideWorldBounds = true;
        vladimir.setBounce(1);
        vladimir.setVelocity(Phaser.Math.Between(-40, 40), Phaser.Math.Between(-50, 50));

        var back = this.physics.add.staticImage(100,550, "back").setScale(1);
        var rrestart = this.physics.add.staticImage(250,550,"rrestart").setScale(1);
    }

    update()
    {
        swarm.swarmblocks(core, blocks);
        Phaser.Actions.Rotate(blocks.getChildren(),0.002, 0.005);
        
        if(Phaser.Input.Keyboard.JustDown(this.B)) {
            console.log('Credits create');
            this.scene.start('StartScene');
        }
        if(Phaser.Input.Keyboard.JustDown(this.R)) {
            console.log('Credits create');
            this.scene.start('CreditsScene');
        };
    }
};
