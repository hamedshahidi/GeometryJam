class LevelsScene extends Phaser.Scene {
    constructor(){
        super("LevelsScene");
    }

    create()
    {
        
        this.B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.ONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.TWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.THREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.FOUR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        
        var back = this.physics.add.staticImage(100,550, "back").setScale(1);
        

        var lvl1 = this.physics.add.staticImage(400,150, "lvl1").setScale(1);
        var lvl2 = this.physics.add.staticImage(400,250, "lvl2").setScale(1);
        var lvl3 = this.physics.add.staticImage(400,350, "lvl3").setScale(1);
        var lvl4 = this.physics.add.staticImage(400,450, "lvl4").setScale(1);

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
    
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.B)) {
            console.log('Levels create');
            this.scene.start('StartScene');
        };
        if(Phaser.Input.Keyboard.JustDown(this.ONE)) {
            console.log('Levels create');
            this.scene.start('PlayScene1');
        };
        if(Phaser.Input.Keyboard.JustDown(this.TWO)) {
            console.log('Levels create');
            this.scene.start('PlayScene2');
        };
        if(Phaser.Input.Keyboard.JustDown(this.THREE)) {
            console.log('Levels create');
            this.scene.start('PlayScene3');
        };
        if(Phaser.Input.Keyboard.JustDown(this.FOUR)) {
            console.log('Levels create');
            this.scene.start('PlayScene4');
        };
    }
};  