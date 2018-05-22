var player;
var speed = 60;
var bullets;
var cursors;
var enemysquare;
var enemytriangle;
var basicenemies;
var dist;
var scale;
var _angle = 0;
var left;
var right;
var plat1;
var plat2;
var plat3;
var plat4;
var count1;

class PlayScene1 extends Phaser.Scene {
    constructor()
    {
        super("PlayScene1");
    }

    create()
    {
        count1 = 0;
        //SET UP INPUT FOR PLAYER MOVING LEFT AND RIGHT
        cursors = this.input.keyboard.createCursorKeys();

        //BULLET
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

        //NEXT SCENE
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
               
        //GENERATES THE PLAYER SPRITE
        player = this.physics.add.sprite(400,582 , "square");
        player.enableBody = true;
        player.body.collideWorldBounds = true;

        //GENERATES BARRIES
        plat1 = this.physics.add.staticImage(400, 300, "jam");
        plat2 = this.physics.add.staticImage(100, 300, "jam");
        plat3 = this.physics.add.staticImage(700, 300, "jam");
        plat4 = this.physics.add.staticImage(400, 100, "jam");
        
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
    
        //VARIABLE FOR GENERATING BASIC ENEMIES BY CALLING THE ENEMY CLASS
        basicenemies = new enemy();

        //CALLS THE METHOD(S) FOR GENERATING BASIC ENEMIES
        basicenemies.enemies(5, enemysquare, 50, 30, "enemysquare");
        basicenemies.enemies(5, enemytriangle, 400, 70, "enemytriangle");        
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
            count1++;
    }

    //FUNCTION FOR DESTROYING BULLET
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

        //ROTATES THE BODIES OF BASIC ENEMIES
        Phaser.Actions.Rotate(enemysquare.getChildren(),0.002, 0.009);
        Phaser.Actions.Rotate(enemytriangle.getChildren(),0.002, 0.009);
             
        //ADDS COLLISION TO THE BODIES
        this.physics.add.collider(enemysquare, [plat1, plat2, plat3, plat4, enemytriangle]);
        this.physics.add.collider(enemytriangle,[enemysquare,plat1,plat2,plat3,plat4]);
        this.physics.add.collider(player, [enemysquare, enemytriangle], this.gameOver, null, this);       
        this.physics.add.overlap(bullets, [enemysquare, enemytriangle], this.destroyEnemy, null, this);
        this.physics.add.overlap([plat1, plat2, plat3, plat4], bullets, this.destroyBullet, null, this);


        //SHOOTS BULLETS BY PRESSING SPACEBAR
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            //console.log(this.bullet);

            let mybullet = bullets.get();

            if(mybullet) 
            {
               mybullet.fire(player);
            }
        }

        //SET THE KILL COUNT FOR GOING TO NEXT SCENE
        if(count1 >= 10 )
        {
         this.scene.start("PlayScene2");
        }
        
        //SWITCHES TO NEXT SCENE IF Q IS PRESSED
        if(Phaser.Input.Keyboard.JustDown(this.Q))
        {
            console.log("1");
            this.scene.start("PlayScene2");
        }

        if(Phaser.Input.Keyboard.JustDown(this.R))
        {
            console.log("1");
            this.scene.start("StartScene");
        }
    }
};
