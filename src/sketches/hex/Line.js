const baseRad = Math.PI * 2 / 6

const defaultOpts = {
  len: 20,
  baseTime: 10,
  addedTime: 10,
  dieChance: .05,
  sparkChance: .1,
  sparkDist: 10,
  sparkSize: 2,

  color: 'hsl(hue,100%,light%)',
  baseLight: 50,
  addedLight: 10,
  shadowToTimePropMult: 6,
  baseLightInputMultiplier: .01,
  addedLightInputMultiplier: .02,

  hueChange: .1
}

export default class Line {

  constructor (sketch, opts) {
    this.opts = opts ? Object.assign(defaultOpts, opts) : defaultOpts
    this.sketch = sketch
    this.reset()
  }

  reset () {
    const { opts, sketch } = this
    opts.cx = sketch.opts.cx
    opts.cy = sketch.opts.cy
    this.x = 0
    this.y = 0
    this.addedX = 0
    this.addedY = 0

    this.rad = 0

    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random()

    this.color = opts.color.replace('hue', sketch.tick * opts.hueChange)
    this.cumulativeTime = 0

    this.beginPhase()
  }

  beginPhase () {
    const { opts, sketch } = this
    const dieX = opts.cX / opts.len
    const dieY = opts.cY / opts.len

    this.x += this.addedX
    this.y += this.addedY

    this.time = 0
    this.targetTime = ( opts.baseTime + opts.addedTime * Math.random() ) |0

    this.rad += baseRad * ( Math.random() < .5 ? 1 : -1 )
    this.addedX = Math.cos( this.rad )
    this.addedY = Math.sin( this.rad )

    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
      this.reset()
    }
  }

  step () {
    const { opts } = this
    const { ctx } = this.sketch
    ++this.time
    ++this.cumulativeTime

    if (this.time >= this.targetTime) {
      this.beginPhase()
    }

    const prop = this.time / this.targetTime,
          wave = Math.sin( prop * Math.PI / 2  ),
          x = this.addedX * wave,
          y = this.addedY * wave

    ctx.shadowBlur = prop * opts.shadowToTimePropMult
    ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin( this.cumulativeTime * this.lightInputMultiplier ))
    ctx.fillRect(opts.cx + ( this.x + x ) * opts.len, opts.cy + ( this.y + y ) * opts.len, 2, 2)

    if (Math.random() < opts.sparkChance) {
      ctx.fillRect( opts.cx + ( this.x + x ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.cy + ( this.y + y ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize )
    }
  }

}
