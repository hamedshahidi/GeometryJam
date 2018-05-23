const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade'
    },
    scene: [PreloadScene, StartScene, PlayScene1, PlayScene2, PlayScene3, PlayScene4, EndScene, LevelsScene, ControlsScene, CreditsScene]
  };
  
  window.onload = function() {
    const theGame = new Phaser.Game(config);
    theGame.scene.start('PreloadScene');
  };