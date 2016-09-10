export default class SketchFrame {
  constructor (canvas, Sketch) {
    this.canvas = canvas
    this.Sketch = Sketch
  }

  mount () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    const ctx = this.canvas.getContext('2d')
    this.sketch = new this.Sketch(ctx, { h: window.innerHeight, w: window.innerWidth })
    this.sketch.start()

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.sketch.reset(window.innerWidth, window.innerHeight)
    })
  }
}
