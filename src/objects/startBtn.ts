import { TextBtn } from "./textBtn";

class StartBtn extends TextBtn {
  constructor(scene: Phaser.Scene, text: string) {
    super(scene, 120, 200, text, "#f6ae54")
  }
}

export {
  StartBtn
}
