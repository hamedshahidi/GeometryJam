var player;
var speed = 60;
var bullets;
var cursors;
var enemysquare;
var enemytriangle;
var core;
var core_2;
var blocks;
var blocks_2;
var basicenemies;
var dist;
var scale;
var _angle = 0;
var left;
var right;
var pointer;
var plat1;
var plat2;
var plat3;
var plat4;
var count4;
var bulletCount;
var score;
var scoretxt;
var bullettxt;
var accuracy;
var trigger = null

class PlayScene4 extends Phaser.Scene {
    constructor(){
        super("PlayScene4");
    }

    create()
    {
        //INITIALIZING VALUES
        score = 0;
        count4 = 0;
        bulletCount = 0;
        accuracy = 0;
        trigger = null;

        //SETTING SCORE BAR
        scoretxt = this.add.text(600, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });
        this.scene.bringToTop(scoretxt);
        bullettxt = this.add.text(16, 16, 'bullets: 0', { fontSize: '16px', fill: '#fff' });
        this.scene.bringToTop(bulletCount);
        accuracytxt = this.add.text(200,16, 'accuracy: 0 %', { fontSize: '14px', fill: '#fff' });
        this.scene.bringToTop(accuracytxt);
        
        
        //SET UP INPUT FOR PLAYER MOVING LEFT AND RIGHT
        cursors = this.input.keyboard.createCursorKeys();

        //BULLET
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        
        bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
               
        //NEXT SCENE & RESTART
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
               
        //GENERATES THE PLAYER SPRITE
        player = this.physics.add.sprite(400,582, "square");
        player.enableBody = true;
        player.body.collideWorldBounds = true;

        //GENERATES BARRIES    
        plat1 = this.physics.add.staticImage(400, 300, "jam");
        
        //CREATES CORE(S) FOR BLOCK SWARM
        core = this.physics.add.sprite(100, 500, "core");
        core.body.collideWorldBounds = true;
        core.setBounce(1);
        core.setVelocity(100, 100);
        core_2 = this.physics.add.sprite(700, 500, "core");
        core_2.body.collideWorldBounds = true;
        core_2.setBounce(1);
        core_2.setVelocity(100, 100);
        
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
    
        //CREATES VARIABLE FOR SWARM BY CALLING THE enemy CLASS
        swarm = new enemy();

        //CREATES VARIABLE FOR BASIC ENEMIES BY CALLING THE enemy CLASS
        basicenemies = new enemy();

        //CALLS THE METHOD(S) FOR GENERATING BASIC ENEMIES
        basicenemies.enemies(10, enemysquare, 50, 30, "enemysquare");
        basicenemies.enemies(10, enemytriangle, 400, 70, "enemytriangle");

        //BULLET COLLISION
        this.physics.add.overlap(plat1, bullets, this.destroyBullet, null, this);
        this.physics.add.overlap(bullets, enemysquare, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, enemytriangle, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, blocks, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, blocks_2, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, core, this.destroyEnemy, null, this);
        this.physics.add.overlap(bullets, core_2, this.destroyEnemy, null, this);

        //ADDS COLLISION TO THE BODIES
        this.physics.add.collider(enemysquare, [plat1, enemytriangle, core, core_2, blocks, blocks_2]);
        this.physics.add.collider(enemytriangle,[enemysquare,plat1,core, core_2, blocks, blocks_2]);
        this.physics.add.collider(player, [enemysquare, enemytriangle, core, core_2, blocks, blocks_2], this.gameOver, null, this);
        this.physics.add.collider(core,[enemysquare, enemytriangle, plat1, core_2]);
        this.physics.add.collider(core_2,[enemysquare, enemytriangle, plat1,core]);
    }


    gameOver ()
    {
        console.log("Game is Over!")
        var gmo = this.add.image(400, 300, "gameover");
        var rrestart = this.physics.add.staticImage(300,550, "rrestart").setScale(1);
        var mainmenu = this.physics.add.staticImage(500, 550, "mainmenu").setScale(1);  
    }

    //FUNCTION FOR DESTROYING ENEMY
    destroyEnemy(first, second)
    {                  
        first.destroy();
        second.destroy();
        count4++;
        accuracytxt.setText('Accuracy: ' + accuracy + '%');
        scoretxt.setText('Score: ' + score);          
    }

    //FUNCTION FOR DESTROYING BULLET
    destroyBullet(first, second)
    {
        second.destroy();
    }
    

    update()
    {
        if(bulletCount>0)
        {
            accuracy = Number(((count4/bulletCount)*100).toFixed(2));
            score = count4*10;
        }

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
        if(count4 >= 42 && trigger == null)
        {
            if (trigger == null)
            {
                var scoreResult = score;
                var bulletResult = bulletCount;
                var accuracyResult = accuracy;
                trigger = 1;
            }
            var resultsBg = this.physics.add.staticImage(400,300, "resultsBg").setScale(1);
            var next = this.physics.add.staticImage(400,500, "mainmenu").setScale(1);
            scoretxt = this.add.text(220, 230, 'score: '+scoreResult, { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(scoretxt);
            bullettxt = this.add.text(270, 280, 'bullets: '+bulletResult, { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(bulletCount);
            accuracytxt = this.add.text(320,330, 'accuracy: '+accuracyResult+ '%', { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(accuracytxt);
            var nexttxt = this.add.text()
        }

        if(trigger == 1 && Phaser.Input.Keyboard.JustDown(this.M))
        {
            this.scene.start("StartScene");
        }
      

      

        //ROTATES THE SQUARES AROUND THE CORES
        Phaser.Actions.Rotate(blocks.getChildren(),0.002, 0.005);
        Phaser.Actions.Rotate(blocks_2.getChildren(),0.002, 0.005);
        Phaser.Actions.Rotate(enemysquare.getChildren(),0.002, 0.009);
        Phaser.Actions.Rotate(enemytriangle.getChildren(),0.002, 0.009);
        swarm.swarmblocks(core, blocks);
        swarm.swarmblocks(core_2, blocks_2);
       
        //shoot bullets by pressing spacebar
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            
            console.log(this.bullet);
            let mybullet = bullets.get();
            if(mybullet)
            {
                bulletCount++;
                bullettxt.setText('Bullets: ' + bulletCount);
                accuracytxt.setText('Accuracy: ' + accuracy + '%');
                scoretxt.setText('Score: ' + score);
                mybullet.fire(player);
            }
        }
        
        //SWITCHES TO NEXT SCENE IF Q IS PRESSED
        if(Phaser.Input.Keyboard.JustDown(this.Q))
        {
            console.log("4");
            this.scene.start("GameOverScene");
        }
        if(Phaser.Input.Keyboard.JustDown(this.R))
        {
            this.scene.start("PlayScene4");
        }
        if(Phaser.Input.Keyboard.JustDown(this.M))
        {
            this.scene.start("StartScene");
        }
    }
};
