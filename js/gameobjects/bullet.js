class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
      super(scene, 0, 0, 'bullet');
  
      this.speed = 0;
      this.startSpeed = -1;
  
      this.born = 0;
      this.maxLifeTime = 1000;
    }
  
    fire(player) {
      this.setPosition(player.x, player.y);
      this.born = 0;
      this.speed = this.startSpeed;
      this.setActive(true);
      this.setVisible(true);
    }
  
    update(time, delta) {
      this.y += this.speed * delta;
  
      this.born += delta;
      if(this.born > this.maxLifeTime) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }