const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade'
    },
    scene: [PreloadScene, PlayScene]
  };
  
  window.onload = function() {
    const theGame = new Phaser.Game(config);
    theGame.scene.start('PreloadScene');
  };