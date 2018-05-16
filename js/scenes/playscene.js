var player;
var greenSprite;
var coreSprite;
var group;
var targetSprite;
var speed = 60;

var element;
var blocks;

var dist;
var scale;

var timedEvent;

var left;
var down;
var up;
var right;

var pointer;

class PlayScene extends Phaser.Scene {
    constructor(){
        super("PlayScene");
    }







    create()
    {
    
        //SET UP INPUT FOR PLAYER MOVING LEFT AND RIGHT
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    

       
        //GENERATES THE PLAYER SPRITE
        player = this.physics.add.sprite(400,600, "square");
        player.enableBody = true;
        player.body.collideWorldBounds = true;

        

       

        //CREATES SPRITES FOR TARGETTING RETICLE
        targetSprite = this.physics.add.sprite(400, 350, "target");
        targetSprite.body.collideWorldBounds = true;
        targetSprite.setBounce(2);
        

        //LOCKS MOUSE POINTER TO GAME ON CLICK
        this.sys.canvas.addEventListener("mousedown", () => {
            this.input.mouse.requestPointerLock();
        
        }
        );
        
        
        //MOVES THE TARGET RETICLE WITH THE VIA MOUSE POINTER
        this.input.on("pointermove", function (pointer)
        {
            targetSprite.x += pointer.movementX;
            targetSprite.y += pointer.movementY;

        },this);

        //CREATES CORE FOR BLOCK SWARM
        coreSprite = this.physics.add.sprite(100, 200, "core");
        coreSprite.body.collideWorldBounds = true;
        coreSprite.setBounce(1);
        coreSprite.setVelocity(Phaser.Math.Between(100, 500), Phaser.Math.Between(100, 500));

        //CREATES GROUP OF BLOCKS
        group = this.physics.add.group({
            key: "gsquare",
            frameQuantity: 5,
            collideWorldBounds: true,
            bounceX: 1.5,
            bounceY: 1.5,
            setXY: {
                x: Phaser.Math.Between(200, 400),
                y: Phaser.Math.Between(40, 100)
            }

        });
        

       // group.setVelocityX(Phaser.Math.Between(50,100),Phaser.Math.Between(50,100));
        //group.setVelocityY(Phaser.Math.Between(50,100),Phaser.Math.Between(50,100));
        
       
        
        
      
       
    }

   

    update()
    {
        //GIVES THE PLAYER BODY FRICTION, SO THAT THE ADDED VELOCITY DOESN'T KEEP HIM SLIDING
        player.body.velocity.x *= 0.9;
        player.body.velocity.y *= 0.9;

        //ROTATES THE SQUARES AROUND THE CORES
        Phaser.Actions.Rotate(group.getChildren(),0.002, 0.005);

        
        
        

        if(right.isDown)
        {
            player.body.velocity.x += speed;
        }

        if(left.isDown)
        {
            player.body.velocity.x -= speed;
        }

        
         
        targetSprite.body.velocity.x = player.body.velocity.x;
        targetSprite.body.velocity.y = player.body.velocity.y;
        

        reticle(targetSprite, 70);
        swarm(coreSprite);
        this.physics.world.collide(targetSprite, group);
        this.physics.world.collide(player, group);
        this.physics.world.collide(coreSprite, player);
        this.physics.world.collide(coreSprite, targetSprite);
        
        
    }

   


};



//FUNCTION FOR KEEPING THE RETICLE AT A CERTAIN DISTANCE FROM THE PLAYER
function reticle(targetSprite, radius)
{
    
    dist = Phaser.Math.Distance.Between(player.x, player.y, targetSprite.x, targetSprite.y);

    if(dist > radius || dist < radius)
    {
        var scale = dist/radius;

        targetSprite.x = player.x + (targetSprite.x - player.x)/scale;
        targetSprite.y = player.y + (targetSprite.y - player.y)/scale;
    }
}

function destblock(first, second)
{
    second.destroy();
}

function swarm()
{
    //Iterates for each child in the group
    group.children.iterate(function(child){
        var dx = coreSprite.x - child.x;    //DISTANCE BETWEEN EACH CHILD AND THE CORE
        var dy = coreSprite.y - child.y;
        dx *= 10;
        dy *= 10;
        //dx *= Phaser.Math.Between(10, 40);                //MULTIPLIES THE DISTANCE BETWEEN CHILD OF GROUP AND CORE
        //dy *= Phaser.Math.Between(10, 40);

        child.setVelocity(dx, dy);          //SETS VELOCITY TO dx
    })

   
}

/*class Bullet extends Phaser.GameObjects.Sprite
{
    constructor(gamescene)
    {
        super(gamescene);
        Phaser.GameObjects.Image.call(this, gamescene, 0, 0, "bullet");
        this.speed = Phaser.Math.GetSpeed(400, 1);
    }

    fire(x,y)
    {
        this.setPosition(x,y - this.gamescene.gun.height/2);
        this.setActive(true);
        this.setVisible(true);
    }


}*/