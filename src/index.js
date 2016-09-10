import SketchFrame from './SketchFrame'
import Sketch from './sketches/sandbox'

const c = document.getElementById('canvas')

setTimeout(() => {
  const frame = new SketchFrame(c, Sketch)
  frame.mount()
  frame.sketch.start()
}, 1000)
