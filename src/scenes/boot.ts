class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("bg", "./assets/imgs/bg.jpg")
      .image("normalSamurai", "./assets/imgs/normal-samurai.png")
      .image("rageSamurai", "./assets/imgs/rage-samurai.png")
      .image("kakashi", "./assets/imgs/kakashi.png")
      .image("0", "./assets/imgs/number_0.png")
      .image("1", "./assets/imgs/number_1.png")
      .image("2", "./assets/imgs/number_2.png")
      .image("3", "./assets/imgs/number_3.png")
      .image("4", "./assets/imgs/number_4.png")
      .image("5", "./assets/imgs/number_5.png")
      .image("6", "./assets/imgs/number_6.png")
      .image("7", "./assets/imgs/number_7.png")
      .image("8", "./assets/imgs/number_8.png")
      .image("9", "./assets/imgs/number_9.png")
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
