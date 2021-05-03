const canvas = document.getElementById('canvas')
let innerWidth = window.innerWidth
let innerHeight = window.innerHeight
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')

const gravity = 1
const friction = 0.99
class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.fill()
    ctx.fillStyle = 'dodgerblue'
  }
  update() {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }
    this.y += this.dy
    this.draw()
  }
}

function getrandomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
let y = canvas.height / 2
let radius = getrandomRange(10, 30)
let dy = 2
let dx = 2

let balls = []

function init() {
  balls = []
  for (let i = 0; i < 100; i++) {
    balls.push(
      new Ball(
        getrandomRange(0, canvas.width) - radius - dx,
        getrandomRange(0, canvas.height / 2) - radius - dy,
        dy,
        radius,
      ),
    )
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  requestAnimationFrame(animate)
    // console.log(balls)
  for (let ball of balls) {
    ball.update()
  }
}
init()
animate()