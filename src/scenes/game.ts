class Game extends Phaser.Scene {
  samurai!: Phaser.GameObjects.Image
  kakashi!: Phaser.GameObjects.Image

  constructor() {
    super({ key: "game" })
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)

    const charY = 300
    this.samurai = this.add.image(280, charY, "normalSamurai")
    this.kakashi = this.add.image(40, charY, "kakashi")
  }
}

export {
  Game
}
