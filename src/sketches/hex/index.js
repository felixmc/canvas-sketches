import Sketch from '../../Sketch'
import Line from './Line'

const defaultOpts = {
  count: 50,
  spawnChance: 1,
  repaintAlpha: .04,
}

export default class HexSketch extends Sketch {

  constructor (ctx, opts = {}) {
    super(ctx, opts)
    this.opts = Object.assign(defaultOpts, opts)
    this.lines = []
  }

  draw () {
    const { ctx, opts, lines } = this

    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = 0
    ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`
    ctx.fillRect(0, 0, opts.w, opts.h)
    ctx.globalCompositeOperation = 'lighter'

    if (lines.length < opts.count && Math.random() < opts.spawnChance) {
      lines.push(new Line(this))
    }

    lines.map(line => line.step())
  }

}
