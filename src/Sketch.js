export default class Sketch {
  constructor (ctx, opts = {}) {
    this.opts = opts
    this.ctx = ctx
    this.tick = 0
    this.frameId = null

    this._draw = this._draw.bind(this)

    this.reset()
  }

  _draw () {
    this.tick++
    if (this.draw) this.draw()
    this.frameId = window.requestAnimationFrame(this._draw)
  }

  start () {
    if (this.frameId === null && this.draw) {
      this.reset()
      this.frameId = window.requestAnimationFrame(this._draw)
    }
  }

  stop () {
    if (this.frameId !== null) {
      window.stopAnimationFrame(this.frameId)
    }
  }

  reset (width = this.opts.w, height = this.opts.h) {
    const { opts } = this
    opts.h = height
    opts.w = width
    opts.cx = width / 2
    opts.cy = height / 2

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, width, height)
  }
}
