import { randomInt } from '../utils.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
let groundHeight = 100

window.addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

const BACKGROUND_GRADIENT = ctx.createLinearGradient(0, 0, 0, canvas.height)
BACKGROUND_GRADIENT.addColorStop(0, '#171e26')
BACKGROUND_GRADIENT.addColorStop(1, '#3f586b')

function Star(x, y, radius, color) {
  this.x = x
  this.y = y
  this.color = color
  this.radius = radius
  this.velocity = { x: randomInt(-4, 4), y: 4 }
  this.gravity = 1
  this.friction = 0.8
}

Star.prototype.shatter = function() {
  this.radius -= 3
  for (let i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 4, 'red'))
  }
}

Star.prototype.draw = function() {
  ctx.save()
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = this.color
  ctx.shadowColor = '#E3EAEF'
  ctx.shadowBlur = 20
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

Star.prototype.update = function() {
  this.y += this.velocity.y
  this.x += this.velocity.x
  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction
    this.shatter()
  } else {
    this.velocity.y += this.gravity
  }
  if (
    this.x + this.radius + this.velocity.x > canvas.width ||
    this.x - this.radius <= 0
  ) {
    this.velocity.x = -this.velocity.x
  }
  this.draw()
}

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color)
  this.velocity = { x: randomInt(-5, 5), y: randomInt(-15, 15) }
  this.gravity = 0.1
  this.friction = 0.8
    // time to leave
  this.ttl = 100
  this.opacity = 1
}

MiniStar.prototype.draw = function() {
  ctx.save()
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
  ctx.shadowColor = '#E3EAEF'
  ctx.shadowBlur = 20
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

MiniStar.prototype.update = function() {
  this.draw()
  if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction
  } else {
    this.velocity.y += this.gravity
  }
  this.y += this.velocity.y
  this.x += this.velocity.x
  this.ttl -= 1
  this.opacity -= 1 / this.ttl
}

function createMountainRange(mountainAmount, height, color) {
  for (let i = 0; i < mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount
    ctx.beginPath()
    ctx.moveTo(i * mountainWidth, canvas.height)
    ctx.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
    ctx.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
    ctx.lineTo(i * mountainWidth - 325, canvas.height)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }
}

let stars
let miniStars
let backgroundStars
let ticker = 0
let tickerSpawnRate = 75

function init() {
  stars = []
  miniStars = []
  backgroundStars = []
    // for (let i = 0; i < 10; i++) {
    //   const x = Math.random() * canvas.width
    //   const y = Math.random() * canvas.height
    //     // const radius = Math.random() * 30 + 10
    //   stars.push(new Star(x, y, 30, '#E3EAEF'))
    // }
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 3
    backgroundStars.push(new Star(x, y, radius, 'white'))
  }
}

function animate() {
  ctx.fillStyle = BACKGROUND_GRADIENT
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  backgroundStars.forEach((star) => {
    star.draw()
  })

  createMountainRange(1, canvas.height - 50, '#384551')
  createMountainRange(2, canvas.height - 100, '#2B3843')
  createMountainRange(3, canvas.height - 150, '#26333E')
  ctx.fillStyle = '#182028'
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)
  requestAnimationFrame(animate)
  stars.forEach((star, index) => {
    if (star.radius === 0) stars.splice(index, 1)
    star.update()
  })
  miniStars.forEach((miniStar, index) => {
    if (miniStar.ttl == 0) miniStars.splice(index, 1)
    miniStar.update()
  })

  ticker++
  if (ticker % tickerSpawnRate === 0) {
    const radius = 12
    const x = Math.max(radius, Math.random() * canvas.width - radius)
    stars.push(new Star(x, -100, radius, 'white'))
    tickerSpawnRate = randomInt(75, 200)
  }
}

init()
animate()