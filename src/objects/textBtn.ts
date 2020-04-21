const createFontStyle = (color: string) => {
  return {
    color: color,
    stroke: "white",
    fontFamily: "Fira code, Meiryo",
    fontSize: `24px`,
    fontStyle: "bold",
    strokeThickness: 6
  }
}

class TextBtn extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, text: string, color: string) {
    super(scene, x, y, text, createFontStyle(color))

    this.setAlpha(0)
    scene.add.existing(this)
    // ゆっくりと現れる
    scene.add.tween({
      targets: this,
      duration: 1000,
      alpha: 1,
      onComplete: () => this.setInteractive()
    })
  }
}

export {
  TextBtn
}
