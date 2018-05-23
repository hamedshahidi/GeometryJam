var B;


class ControlsScene extends Phaser.Scene {
    constructor(){
        super("ControlsScene");
    }

    create()
    {
        
        this.B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        
        var back = this.physics.add.staticImage(100,550, "back").setScale(1);

        var spacebar = this.physics.add.staticImage(300,350, "spacebar").setScale(1);
        var left = this.physics.add.staticImage(500,350, "left").setScale(1);
        var right = this.physics.add.staticImage(570,350, "right").setScale(1);

        var rrestart = this.physics.add.staticImage(280,250, "rrestart").setScale(1);
        var mainmenu = this.physics.add.staticImage(500, 250, "mainmenu").setScale(1);

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
            console.log('Controls create');
            this.scene.start('StartScene');
        };
    }
};
