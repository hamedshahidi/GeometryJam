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
        this.load.image("play", "./assets/pplay.png");
        this.load.image("levels", "./assets/llevels.png");
        this.load.image("controls", "./assets/ccontrols.png");
        this.load.image("restart", "./assets/restart.png");
        this.load.image("rrestart", "./assets/rrestart.png");
        this.load.image("back", "./assets/bback.png");
        this.load.image("left", "./assets/left.png");
        this.load.image("right", "./assets/right.png");
        this.load.image("spacebar", "./assets/spacebar.png");
        this.load.image("mainmenu", "./assets/mainmenu.png");
        this.load.image("lvl1", "./assets/lvl1.png");
        this.load.image("lvl2", "./assets/lvl2.png");
        this.load.image("lvl3", "./assets/lvl3.png");
        this.load.image("lvl4", "./assets/lvl4.png");
        this.load.image("resultsBg", "./assets/results_bg.png");
        this.load.image("next", "./assets/next.png");
        this.load.image("hamed", "./assets/hamed.png");
        this.load.image("vladimir", "./assets/vladimir.png");
        this.load.image("credits", "./assets/credits.png");
        
      
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