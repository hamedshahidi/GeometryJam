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
var bulletCount;
var score;
var scoretxt;
var bullettxt;
var accuracy;
var accuracytxt;
var trigger = null;

class PlayScene3 extends Phaser.Scene {
    constructor(){
        super("PlayScene3");
    }

    create()
    {
        //INITIALIZING VALUES
        score = 0;
        count3 = 0;
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
        
        //NEXT SCENE
        this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.N = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
               
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
        var rrestart = this.physics.add.staticImage(300,550, "rrestart").setScale(1);
        var mainmenu = this.physics.add.staticImage(500, 550, "mainmenu").setScale(1);  
    }

    //FUNCTION FOR DESTROYING ENEMY
    destroyEnemy(first, second)
    {       
        first.destroy();
        second.destroy();
        count3++;
        accuracytxt.setText('Accuracy: ' + accuracy+ '%');
        scoretxt.setText('Score: ' + score);
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
        if(bulletCount>0)
        {
            accuracy = Number(((count3/bulletCount)*100).toFixed(2));
            score = count3*100;
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
                bulletCount++;
                bullettxt.setText('Bullets: ' + bulletCount);
                accuracytxt.setText('Accuracy: ' + accuracy +'%');
                scoretxt.setText('Score: ' + score);
                mybullet.fire(player);
            }
        }

        if(count3 >= 1 && trigger == null)
        {
            if (trigger == null)
            {
                var scoreResult = score;
                var bulletResult = bulletCount;
                var accuracyResult = accuracy;
                trigger = 1;
            }
            var resultsBg = this.physics.add.staticImage(400,300, "resultsBg").setScale(1);
            var next = this.physics.add.staticImage(400,500, "next").setScale(1);
            scoretxt = this.add.text(220, 230, 'score: '+scoreResult, { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(scoretxt);
            bullettxt = this.add.text(270, 280, 'bullets: '+bulletResult, { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(bulletCount);
            accuracytxt = this.add.text(320,330, 'accuracy: '+accuracyResult+ '%', { fontSize: '32px', fill: '#000' });
            this.scene.bringToTop(accuracytxt);
            var nexttxt = this.add.text()
        }

        if(trigger == 1 && Phaser.Input.Keyboard.JustDown(this.N))
        {
            this.scene.start("PlayScene4");
        }
        
       //SWITCHES TO NEXT SCENE IF Q IS PRESSED
        if(Phaser.Input.Keyboard.JustDown(this.Q))
        {
        console.log("3");
        this.scene.start("PlayScene4");
        }
        if(Phaser.Input.Keyboard.JustDown(this.R))
        {
            this.scene.start("PlayScene3");
        }
        if(Phaser.Input.Keyboard.JustDown(this.M))
        {
            this.scene.start("StartScene");
        }
    }
};


