import Sketch from '../../Sketch'

const defaultOpts = {

}

export default class SandboxSketch extends Sketch {

  constructor (ctx, opts) {
    super(ctx, opts)
    this.opts = Object.assign(defaultOpts, opts || {})
  }

  depthProps (x, y, angle, maxDepth, depth) {
    const exp = .4
    const ds = ((maxDepth - depth)^exp) / (maxDepth^exp)
    const length = ds * 70

    return {
      color: `hsla(${ds*360+(this.tick)},100%,50%,.5)`,
      width: 5 * ds,
      dx: x + (Math.cos(angle) * length),
      dy: y - (Math.sin(angle) * length),
    }
  }

  drawTree (x, y, angle, maxDepth, depth = 1) {
    if (depth > maxDepth) return;
    const ctx = this.ctx

    const {
      dx,
      dy,
      color,
      width,
    } = this.depthProps(x, y, angle, maxDepth, depth)

    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(dx, dy)
    ctx.stroke()

    this.drawTree(dx, dy, angle + (Math.PI/6), maxDepth, depth + 1)
    this.drawTree(dx, dy, angle - (Math.PI/6), maxDepth, depth + 1)
  }

  draw () {
    const { ctx, opts } = this

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = `rgba(0,0,0,1)`
    ctx.fillRect(0, 0, opts.w, opts.h)

    ctx.globalCompositeOperation = 'lighter'

    const depth = Math.max( Math.min(this.tick % 11), 10)

    this.drawTree(opts.cx, opts.cy + 200, Math.PI/2, depth)
  }

}
