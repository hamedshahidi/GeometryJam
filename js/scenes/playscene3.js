var player;
var speed = 60;
var bullets;
var circle;
var rad;
var core2;
var eyes1;
var eyes2; 
var dist;
var scale;
var _angle1 = 0;
var _angle2 = -45;
var left;
var right;
var plat3;
var plat4;
var count3;
var go;
var cursors;
class PlayScene3 extends Phaser.Scene {
    constructor(){
        super("PlayScene3");
    }

    create()
    {
        count3 = 0;
        
        //SET UP INPUT FOR PLAYER MOVING LEFT AND RIGHT
        cursors = this.input.keyboard.createCursorKeys();
     
        //BULLET
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
        
        //NEXT SCENE
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
               
        //GENERATES THE PLAYER SPRITE
        player = this.physics.add.sprite(400,582, "square");
        player.enableBody = true;
        player.body.collideWorldBounds = true;

        //GENERATES BARRIES
        plat1 = this.physics.add.staticImage(400, 400, "jam");
        plat2 = this.physics.add.staticImage(100, 300, "jam");
        plat3 = this.physics.add.staticImage(700, 300, "jam");
       
        //CREATES CORE FOR CIRCLE
        core2 = this.physics.add.image(500, 300, "core2");
        core2.body.collideWorldBounds = true;
        core2.setBounce(1);
        core2.setVelocity(400, 400);

        //CREATE EYES GROUP FOR CIRCLE
        eyes1 = this.physics.add.group({
            key: "eye",
            frameQuantity: 5,
            collideWorldBounds: true,
        });
        eyes2 = this.physics.add.group({
            key: "eye",
            frameQuantity: 5,
            collideWorldBounds: true,
        });
    
        //CREATES VARIABLE FOR CIRCLE BY CALLING THE enemy CLASS
        circle = new enemy();
        go = new GameOver();

         //ADDS COLLISION TO THE BODIES
        this.physics.add.overlap(player, [eyes1, eyes2, core2], this.gameOver, null, this);
        this.physics.add.overlap([plat1, plat2, plat3], bullets, this.destroyBullet2, null, this);
        this.physics.add.collider(core2, [plat1, plat2, plat3]);

        //BULLET COLLISION
        this.physics.add.overlap(bullets, core2, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, [eyes1, eyes2], this.destroyBullet1, null,this);
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
        first.destroy();
        second.destroy();
        count3++;
    }

    //FUNCTION FOR DESTROYING BULLET
    destroyBullet1(first, second)
    {
       first.destroy();
    }
    destroyBullet2(first, second)
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

        //CALLS FUNCTION FOR CIRCLE BEHAVIOUS
        circle.circle(core2, eyes2, 200, _angle1++);
        circle.circle(core2, eyes1, 20, _angle2--);

        //SHOOTS BULLET BY PRESSING SPACEBAR 
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            console.log(this.bullet);            
            let mybullet = bullets.get();
            if(mybullet)
            {
               mybullet.fire(player);
            }
        }

        if(count3 >= 1)
        {
            this.scene.start('PlayScene4');
        }
        
       //SWITCHES TO NEXT SCENE IF Q IS PRESSED
        if(Phaser.Input.Keyboard.JustDown(this.Q))
        {
        console.log("3");
        this.scene.start("PlayScene4");
        }
        if(Phaser.Input.Keyboard.JustDown(this.R))
        {
            console.log("1");
            this.scene.start("StartScene");
        }
    }
};


