class PreloadScene extends Phaser.Scene {
    constructor() {
      super({key: 'PreloadScene'});
    }
  
          
      preload()
      {
        this.progressBar = this.add.graphics();
  
        this.load.on('progress', this.onProgress, this);
  
        //"this" object is mandatory in JS!!!
        this.load.image("square", "./assets/shooter.png");
        this.load.image("gsquare", "./assets/green.png");
        this.load.image("target", "./assets/target.png");
        this.load.image("core", "./assets/core.png");
        this.load.image("core2", "./assets/core2.png");
        this.load.image("bullet", "./assets/bullet.png");
        this.load.image("enemysquare", "./assets/enemysquare.png");
        this.load.image("enemycircle", "./assets/enemycircle.png");
        this.load.image("enemytriangle", "./assets/enemytriangle.png");
        this.load.image("eye", "./assets/eye.png");
        this.load.image("jam", "./assets/jam.png");
        this.load.image("logo", "./assets/logo_1.png");
        this.load.image("logoTxt", "./assets/logo_txt.png");
        this.load.image("logoBorder", "./assets/logo_border.png");
        this.load.image("gameover", "./assets/gameover.png");
        this.load.image("start", "./assets/start.png");
        this.load.image("restart", "./assets/restart.png");
      
      }
      
      
    onProgress(value) {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xbebebe, 1);
      this.progressBar.fillRect(100, 280, 600 * value, 40);
    }
  
    create() {
      console.log('PreloadScene create');
      this.scene.start("StartScene");
    }
  }