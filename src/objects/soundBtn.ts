import { TextBtn } from "./textBtn";

class SoundBtn extends TextBtn {
  xMark!: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, isMute: boolean) {
    super(scene, 230, 200, "音", "#00b379")

    this.xMark = scene.add.image(230, 200, "x")
      .setAlpha(0)
      .setVisible(isMute)

    scene.add.tween({
      targets: this.xMark,
      duration: 500,
      alpha: 1,
    })
  }

  switch(isMute: boolean) {
    this.xMark.setVisible(isMute)
  }
}

export {
  SoundBtn
}
