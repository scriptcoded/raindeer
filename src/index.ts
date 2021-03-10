export type EmojiSet = string | string[] | Record<string, number>

export interface CreateRainOptions {
  emoji: EmojiSet
  duration?: number
  dropsPerSecond?: number
  dropSize?: number
  speedMin?: number
  speedMax?: number
  rotationStartMin?: number
  rotationStartMax?: number
  rotationDistanceMin?: number
  rotationDistanceMax?: number
  resolution?: number
}

export interface AnimateDropOptions {
  offset?: number
  timeOffset?: number
  speed?: number
  rotationStart?: number
  rotationEnd?: number
}

export interface RainInfo {
  elem: HTMLElement
  intervalID: any
  removeDelay: number
}

const RAIN_STYLE: Partial<CSSStyleDeclaration> = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}

const DROP_STYLE: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  top: '-40px',
  width: '0',
  height: '0',
  transition: 'all 1s linear'
}

let rainIDCounter = 0
const rains: Record<string, RainInfo> = {}

export function start (target: Element, options: CreateRainOptions) {
  const rain = createRain(options)

  target.appendChild(rain)
}

export function stopAll () {
  for (const id in rains) {
    stop(id)
  }
}

export function stop (id: string) {
  const rain = rains[id]
  delete rains[id]

  clearInterval(rain.intervalID)
  setTimeout(() => {
    rain.elem.remove()
  }, rain.removeDelay)
}

function randomInt (min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function normalizeEmojiSet (emojiSet: EmojiSet) {
  let emojiArray = []
  if (typeof emojiSet === 'string') {
    emojiArray = [emojiSet]
  } else
  if (Array.isArray(emojiSet)) {
    emojiArray = [...emojiSet]
  } else {
    for (const emoji in emojiSet) {
      for (let i = 0; i < emojiSet[emoji]; i++) {
        emojiArray.push(emoji)
      }
    }
  }

  return emojiArray
}

function createDrop (emoji: string, size: number) {
  const drop = document.createElement('div')

  drop.textContent = emoji
  drop.classList.add('raindeer__drop')

  Object.assign(drop.style, DROP_STYLE)
  drop.style.fontSize = `${size}px`
  drop.style.top = `-${size * 2}px`

  return drop
}

function animateDrop (drop: HTMLElement, options: AnimateDropOptions = {}) {
  const opt = {
    offset: 0,
    timeOffset: 0,
    speed: 1000,
    rotationStart: -90,
    rotationEnd: 90,
    ...options
  }

  const offset = Math.round(100 * opt.offset)

  drop.style.left = `${offset}%`
  drop.style.transitionDuration = `${opt.speed}ms`
  drop.style.transitionDelay = `${opt.timeOffset}ms`
  drop.style.transform = `rotate(${opt.rotationStart}deg)`

  setTimeout(() => {
    drop.style.top = '110%'
    drop.style.transform = `rotate(${opt.rotationEnd}deg)`
  }, 50)

  setTimeout(() => {
    drop.remove()
  }, opt.speed + 500)
}

function createRain (options: CreateRainOptions) {
  const opt = {
    duration: 0,
    dropsPerSecond: 10,
    dropSize: 20,
    speedMin: 500,
    speedMax: 1000,
    rotationStartMin: -90,
    rotationStartMax: -180,
    rotationDistanceMin: 0,
    rotationDistanceMax: 45,
    resolution: 2,
    ...options
  }

  const rainID = (rainIDCounter++).toString()

  const emojiSet = normalizeEmojiSet(opt.emoji)

  const rain = document.createElement('div')
  rain.classList.add('raindeer')

  Object.assign(rain.style, RAIN_STYLE)

  const interval = 1000 / opt.resolution
  const iterations = opt.duration * opt.resolution
  const dropsPerIteration = opt.dropsPerSecond / opt.resolution

  let i = 0

  const intervalID = setInterval(function () {
    i += 1
    if (opt.duration > 0 && i >= iterations) {
      clearInterval(intervalID)
    }

    const dropCount = i % 2 === 0
      ? Math.floor(dropsPerIteration)
      : Math.ceil(dropsPerIteration)

    for (let j = 0; j < dropCount; j++) {
      const speed = randomInt(opt.speedMin, opt.speedMax)
      const rotationStart = randomInt(opt.rotationStartMin, opt.rotationDistanceMax)
      const rotationDistance = randomInt(opt.rotationDistanceMin, opt.rotationDistanceMax)

      const rotationEnd = rotationStart + rotationDistance

      const offset = Math.random()
      const timeOffset = interval * Math.random()

      const emoji = emojiSet[randomInt(0, emojiSet.length - 1)]
      const drop = createDrop(emoji, opt.dropSize)

      rain.appendChild(drop)

      animateDrop(drop, {
        offset,
        timeOffset,
        speed,
        rotationStart,
        rotationEnd
      })
    }
  }, interval)

  rains[rainID] = {
    elem: rain,
    intervalID,
    removeDelay: opt.speedMax + 500
  }

  if (opt.duration > 0) {
    setTimeout(() => {
      stop(rainID)
    }, opt.duration * 1000)
  }

  return rain
}
