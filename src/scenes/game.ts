import { WIDTH, HEIGHT } from "../constants"
import { TextBtn } from "../objects/textBtn"
import { Score } from "../objects/score"
import { SoundBtn } from "../objects/soundBtn"
import { StartBtn } from "../objects/startBtn"

class Game extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Image
  private samurai!: Phaser.GameObjects.Image
  private waitSound!: Phaser.Sound.BaseSound
  private score = 0
  private isPreStart = true
  private isAccept = false
  private isSuccess = false
  private isTiming = false
  private isMute = false

  constructor() {
    super({ key: "game" })
  }


  create() {
    this.bg = this.add.image(0, 0, "bg").setOrigin(0)
    this.waitSound = this.sound.add("wait", { loop: true })
    const charY = 300
    this.samurai = this.add.image(260, charY, "normalSamurai")
    this.add.image(60, charY, "kakashi")
    new Score(this, this.score)
    this.isAccept = false
    this.isSuccess = false
    this.isTiming = false

    if (this.isPreStart)
      this.createBtns("スタート")
    else
      this.start()
  }

  private start() {
    this.input.on("pointerdown", () => this.check())
    this.waitSound.play()
    this.time.addEvent({
      delay: Phaser.Math.Between(0, 10000),
      callback: () => {
        this.waitSound.stop()
        this.chance()
      }
    })
    this.isAccept = true
    this.sound.mute = this.isMute
  }

  private check() {
    if (!this.isAccept)
      return

    if (this.isTiming)
      this.success()
    else
      this.gameover()
  }

  private chance() {
    if (!this.isAccept)
      return

    this.samurai.setTexture("rageSamurai")
    this.bg.setAlpha(0.6)
    this.isTiming = true

    this.time.addEvent({
      delay: 300,
      callback: () => this.gameover()
    })
  }

  private success() {
    this.sound.play("slashSound")
    this.isAccept = false
    this.isSuccess = true
    this.score++

    this.add.tween({
      targets: this.add.image(WIDTH / 3, 240, "slash"),
      duration: 1000,
      alpha: 0,
      onComplete: () => this.scene.restart()
    })
  }

  private gameover() {
    if (this.isSuccess)
      return

    this.waitSound.stop()
    this.isAccept = false
    this.samurai.setTexture("normalSamurai")
    this.bg.setAlpha(1)

    this.createBtns("もう一回")
  }

  private createBtns(text: string) {
    // tweenのconfigに{ targets: objs }として渡すため。
    // this.children.getAll()でも良かったが、全部よりテキストだけ消す方がなんとなく好みだったので。
    const objs: Phaser.GameObjects.GameObject[] = []

    const soundBtn = new SoundBtn(this, this.isMute)
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.isMute = !this.isMute
        soundBtn.switch(this.isMute)
      })
    objs.push(soundBtn, soundBtn.xMark)

    objs.push(new StartBtn(this, text)
      .on("pointerdown", () => {
        this.score = 0

        this.isPreStart = false

        this.add.tween({
          targets: objs,
          duration: 500,
          alpha: 0,
          onComplete: () => this.scene.restart()
        })
      }))

    if (text === "もう一回") {
      objs.push(new TextBtn(this, WIDTH / 2, 120, "ツイートする", "#00acee")
        .setOrigin(0.5)
        .on("pointerdown", () => this.tweet()))

      objs.push(this.add.text(WIDTH / 2, 280, "無念…", {
        color: "black",
        fontFamily: "Fira code, Meiryo",
        fontSize: "30px",
        fontStyle: "bold",
        stroke: "white",
        strokeThickness: 6
      }))
    }
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
