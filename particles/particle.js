const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const colors = ['#2185c5', '#7ecefd', '#fff6e5', '#ff7f66']
const mouse = { x: innerWidth / 2, y: innerHeight / 2 }

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})
window.addEventListener('resize', (event) => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

function randomIntRange(min, max) {
  return Math.random() * (max - min) + min
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.radians = Math.random() * Math.PI * 2
  this.velocity = 0.05
  this.distanceFromCenter = randomIntRange(50, 100)
  this.lastMouse = { x, y }

  this.draw = (lastPos) => {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.radius
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.closePath()
  }

  this.update = () => {
    const lastPos = { x: this.x, y: this.y }
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05
    this.radians += this.velocity
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter
      // console.log(Math.floor(Math.cos(this.radians)))
    this.draw(lastPos)
  }
}

let particles

function init() {
  particles = []
  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1
    const color = randomColor(colors)
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, color),
    )
  }
}

function animate() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)
  for (let particle of particles) particle.update()
}

init()
animate()