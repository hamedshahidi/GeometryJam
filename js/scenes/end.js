


class EndScene extends Phaser.Scene {
    constructor(){
        super("EndScene");
    }


create(){

    console.log("This is the End!");

//this.startBtn.create(300, 400, 'startBtn').setScale(0.3);
//this.restartBtn = this.add.image(400,300, "gameover").setScale(1);
var gmo = this.add.image(400, 300, "gameover");
var restart = this.add.image(400, 520, "restart");

//this.startBtn.on('pointerover', function (event) {  });
// this.startBtn.on('pointerout', function (event) {  });
//this.startBtn.on('pointerdown', startGame); 

this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
this.Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


}

update(){
    if(Phaser.Input.Keyboard.JustDown(this.Q)) {
        console.log('End create');
       
    }
    if(Phaser.Input.Keyboard.JustDown(this.R))
    {
        console.log("1");
        this.scene.start("StartScene");
    }
}

}
