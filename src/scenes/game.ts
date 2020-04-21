import { WIDTH, HEIGHT } from "../constants"
import { TextBtn } from "../objects/textBtn"
import { Score } from "../objects/score"

class Game extends Phaser.Scene {
  bg!: Phaser.GameObjects.Image
  samurai!: Phaser.GameObjects.Image
  kakashi!: Phaser.GameObjects.Image
  scoreImg!: Score
  score = 0
  isAccept = true
  isSuccess = false
  isTiming = false

  constructor() {
    super({ key: "game" })
  }


  create() {
    this.bg = this.add.image(0, 0, "bg").setOrigin(0)
    const charY = 300
    this.samurai = this.add.image(260, charY, "normalSamurai")
    this.kakashi = this.add.image(60, charY, "kakashi")
    this.scoreImg = new Score(this, this.score)
    this.isAccept = true
    this.isSuccess = false
    this.isTiming = false

    this.input.on("pointerdown", () => this.check())
    this.time.addEvent({
      delay: Phaser.Math.Between(0, 10000),
      callback: () => this.chance()
    })
  }

  private check() {
    if (!this.isAccept)
      return

    this.isAccept = false

    if (this.isTiming)
      this.success()
    else
      this.gameover()
  }

  private chance() {
    this.bg.setAlpha(0.6)
    this.samurai.setTexture("rageSamurai")
    this.isTiming = true

    this.time.addEvent({
      delay: 200,
      callback: () => this.gameover()
    })
  }

  private success() {
    this.isSuccess = true
    this.score++
    this.restart()
  }

  private gameover() {
    if (this.isSuccess)
      return

    this.isAccept = false

    const x = WIDTH / 2
    const y = 240
    const marginY = 40

    const a = new TextBtn(this, x, y, "もう一回", "teal")
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.score = 0
        this.restart()
      })

    const w = new TextBtn(this, x, y + marginY, "ツイートする", "royalblue")
      .setOrigin(0.5)
      .on("pointerdown", () => this.tweet())
  }

  private restart() {
    this.add.tween({
      targets: this.children.getAll(),
      duration: 800,
      alpha: 0,
      onComplete: () => this.scene.restart()
    })
  }

  private tweet() {
    const url = "https://meisoudev.com/games/iaigiri/"
    const tweetURL = `https://twitter.com/intent/tweet?text=${this.score}斬&url=${url}&hashtags=いあいぎり`

    window.open(tweetURL, "blank")
  }
}

export {
  Game
}
