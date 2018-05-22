var distance;
var scale;
var square;
class enemy { 

    swarmblocks(core, group)
    {
        //Iterates for each child in the blocks
        group.children.iterate(function(child){
            var dx = core.x - child.x;    //DISTANCE BETWEEN EACH CHILD AND THE CORE
            var dy = core.y - child.y;
            dx *= 40;             //MULTIPLIES THE DISTANCE BETWEEN CHILD OF blocks AND CORE
            dy *= 40;
    
            child.setVelocity(dx, dy);          //SETS VELOCITY TO dx
    
        });
    }
    
    enemies(amount, group, x, y, image)
    {
        
        for (var i = 0; i < amount; i++)
        {
            group.create(Phaser.Math.Between(20, 700), Phaser.Math.Between(20, 200), image).setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50));
        }
    }
    
    
    circle(coreg, group, rotspeed, angle)
    {
    
        var angle_rad = Math.PI/20 * angle;
       
        group.children.iterate(function(child){ 
        distance = Phaser.Math.Distance.Between(core.x, core.y, child.x, child.y);
    
        if(distance > 40 || distance < 40)
        {
            scale = distance/rad;
    
            child.setVelocity(1,1);
            child.x = core2.x + 40 * Math.cos(angle_rad);
            child.y = core2.y + 40 * Math.sin(angle_rad);
            
        }
    
        });   
    }

}