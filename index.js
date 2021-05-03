const canvas = document.getElementById('canvas')

let innerWidth = window.innerWidth
let innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

// // ctx.fillRect(100, 100, 100, 100)
// ctx.fillStyle = '#88a003'
// ctx.fillRect(200, 300, 100, 100)
// ctx.fillStyle = '#00345a'
// ctx.fillRect(10, 300, 100, 100)

// // line

// ctx.beginPath()
// ctx.moveTo(50, 300)
// ctx.lineTo(200, 50)
// ctx.lineTo(400, 300)
// ctx.strokeStyle = '#a457ec'
// ctx.stroke()

// // arcs
// const colors = ['red', 'blue', 'green', 'pink', 'black', 'orange', 'dodgerblue']

// function randomColor(colors) {
//   const index = Math.floor(Math.random() * colors.length)
//   return colors[index]
// }

// for (let i = 0; i < 100; i++) {
//   const x = Math.random() * window.innerWidth
//   const y = Math.random() * window.innerHeight
//   ctx.beginPath()
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false)
//   ctx.strokeStyle = randomColor(colors)
//   ctx.stroke()
// }
const mouse = {
  x: undefined,
  y: undefined,
}
let maxRadius = 40
let minRadius = 2

const colors = ['red', 'blue', 'dodgerblue', 'yellow', 'pink', 'green']

window.addEventListener('mousemove', (e) => {
  const x = e.x
  const y = e.y
  mouse.x = x
  mouse.y = y
    // console.log(x, y)
})
window.addEventListener('resize', () => {
  innerWidth = window.innerWidth
  innerHeight = window.innerHeight
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})
class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.dx = dx
    this.dy = dy
    this.minRadius = radius
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.fillStyle = this.color
  }
  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < maxRadius
    ) {
      this.radius += 1
    } else if (this.radius > this.minRadius) {
      this.radius -= 1
    }
    this.draw()
  }
}

let circles = []

function init() {
  circles = []
  for (let i = 0; i < 8f00; i++) {
    let radius = Math.random() * 3 + 1
    let dy = Math.random() - 0.5
    let dx = Math.random() - 0.5
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius * 2) + radius
    circles.push(new Circle(x, y, radius, dx, dy))
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  requestAnimationFrame(animate)
  for (let circle of circles) {
    circle.update()
  }
}
init()
animate()