import * as bg from "../assets/imgs/bg.jpg"
import * as normalSamurai from "../assets/imgs/normal-samurai.png"
import * as rageSamurai from "../assets/imgs/rage-samurai.png"
import * as kakashi from "../assets/imgs/kakashi.png"

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("bg", bg)
      .image("normalSamurai", normalSamurai)
      .image("rageSamurai", rageSamurai)
      .image("kakashi", kakashi)
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
