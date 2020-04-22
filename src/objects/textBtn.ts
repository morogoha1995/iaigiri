const createFontStyle = () => {
  return {
    color: "white",
    fontFamily: "Fira code, Meiryo",
    fontSize: `24px`
  }
}

class TextBtn extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string, color: string) {
    super(scene, x, y, text, createFontStyle())

    this
      .setOrigin(0.5)
      .setBackgroundColor(color)
      .setAlpha(0)
      .setPadding(10, 6, 10, 6)

    scene.add.existing(this)

    scene.add.tween({
      targets: this,
      duration: 500,
      alpha: 1,
      onComplete: () => this.setInteractive()
    })
  }
}

export {
  TextBtn
}
