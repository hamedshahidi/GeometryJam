var player;
var speed = 60;
var bullets;
var cursors;
var core;
var blocks;
var swarm;
var dist;
var scale;
var _angle = 0;
var left;
var right;
var plat1;
var plat2;
var plat3;
var plat4;
var count2;

class PlayScene2 extends Phaser.Scene {
    constructor(){
        super("PlayScene2");
    }

    create()
    {
        count2 = 0;
        //SET UP INPUT FOR PLAYER MOVING LEFT AND RIGHT
        cursors = this.input.keyboard.createCursorKeys();
     
        //BULLET
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

        //NEXT SCENE
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        //RESTART
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
                 
        //GENERATES THE PLAYER SPRITE
        player = this.physics.add.sprite(400,582, "square");
        player.enableBody = true;
        player.body.collideWorldBounds = true;

        //GENERATES BARRIE(S)      
        plat1 = this.physics.add.staticImage(400, 300, "jam");
        plat2 = this.physics.add.staticImage(100, 300, "jam");
        plat3 = this.physics.add.staticImage(700, 300, "jam");
       
        //CREATES CORE FOR BLOCK SWARM
        core = this.physics.add.sprite(400, 100, "core");
        core.body.collideWorldBounds = true;
        core.setBounce(1);
        core.setVelocity(100, 100);

        //CREATES GROUP OF BLOCKS FOR THE SWARM
        blocks = this.physics.add.group({
            key: "gsquare",
            frameQuantity: 10,
            collideWorldBounds: true,
            bounceX: 1,
            bounceY: 1
        });
    
        //CREATES VARIABLE FOR SWARM BY CALLING THE enemy CLASS
        swarm = new enemy();

        //BULLET COLLISION
        this.physics.add.overlap(bullets, blocks, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, core, this.destroyEnemy, null, this);
        this.physics.add.overlap([plat1, plat2, plat3, plat4], bullets, this.destroyBullet, null, this);

        //ADDS COLLISION TO THE BODIES
        this.physics.add.collider(core, [plat1, plat2, plat3]);
        this.physics.add.collider(player, [blocks, core], this.gameOver, null, this);
    }

    gameOver ()
    {
        console.log("Game is Over!")
        var gmo = this.add.image(400, 300, "gameover");
        var restart = this.add.image(400, 520, "restart");
    }
    
    //FUNCTION FOR DESTROYING ENEMY
    destroyEnemy(first, second)
    {
        //first.setActive(false).setVisible(false);
        //second.setActive(false).setVisible(false);
        first.destroy();
        second.destroy();
        count2++;
        console.log(count2);
    }

    //FUNCTION FOR DESTROYING BULLET
    destroyBullet(first, second)
    {
        second.destroy();
    } //FUNCTION FOR DESTROYING BULLET
    destroyBullet(first, second)
    {
        second.destroy();
    }

    
    update()
    {
        //GIVES THE PLAYER BODY FRICTION, SO THAT THE ADDED VELOCITY DOESN'T KEEP HIM SLIDING
        player.body.velocity.x *= 0.9;
        player.body.velocity.y *= 0.9;

        //CONTROLS PLAYER
        if(cursors.right.isDown)
        {
            player.body.velocity.x += speed;
        }
        if(cursors.left.isDown)
        {
            player.body.velocity.x -= speed;
        }

        //SET THE KILL COUNT FOR GOING TO NEXT SCENE
        if(count2 >= 11)
        {
             this.scene.start("PlayScene3");
        }

        //ROTATES THE SQUARES AROUND THE CORES
        Phaser.Actions.Rotate(blocks.getChildren(),0.002, 0.005);

        //CALLS FUNCTION FOR SWARM BEHAVIOUR
        swarm.swarmblocks(core, blocks);
    
        //shoot bullets by pressing spacebar
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            console.log(this.bullet);
            let mybullet = bullets.get();
            if(mybullet) 
            {
               mybullet.fire(player);
            }
        }
        
        //SWITCHES TO NEXT SCENE IF Q IS PRESSED
        if(Phaser.Input.Keyboard.JustDown(this.Q))
        {
        console.log("2");
        this.scene.start("PlayScene3");
        }
        if(Phaser.Input.Keyboard.JustDown(this.R))
        {
            console.log("1");
            this.scene.start("StartScene");
        }
    }
};