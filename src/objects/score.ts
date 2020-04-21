import { WIDTH } from "../constants"

class Score extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, score: number) {
    super(scene)

    const x = WIDTH / 2
    const y = 40
    // 一文字あたりの横幅
    const width = 22

    const scoreStr = score.toString()
    const scoreLen = scoreStr.length
    if (scoreLen == 1) {
      this.create(x, y, scoreStr).setDepth(10)
    } else {
      let initialPosition = x - ((scoreLen * width) / 4)

      for (let i = 0; i < scoreLen; i++) {
        this.create(initialPosition, y, scoreStr[i]).setDepth(10)
        initialPosition += width
      }
    }
  }
}

export {
  Score
}
