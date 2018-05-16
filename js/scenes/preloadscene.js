class PreloadScene extends Phaser.Scene {
    constructor() {
      super({key: 'PreloadScene'});
    }
  
          
      preload()
      {
        this.progressBar = this.add.graphics();
  
        this.load.on('progress', this.onProgress, this);
  
        //"this" object is mandatory in JS!!!
        this.load.image("square", "./assets/square.png");
        this.load.image("gsquare", "./assets/green.png");
        this.load.image("target", "./assets/target.png");
        this.load.image("core", "./assets/core.png");
        this.load.image("bullet", "./assets/bullet.png");
      }
      
      
    onProgress(value) {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xbebebe, 1);
      this.progressBar.fillRect(100, 280, 600 * value, 40);
    }
  
    create() {
      console.log('PreloadScene create');
      this.scene.start('PlayScene');
    }
  }