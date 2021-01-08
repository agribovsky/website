import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Canvas, { CanvasContext, CanvasDrawer } from '../components/Canvas'

export default function Backdoor({file, cms, themeHandler, hideTopBar}) {


  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    hideTopBar(false)
  }, [])

  return showGame ? (
  <Background>
    <Canvas context={canvasContext}>
      
    </Canvas>
  </Background>
  ) : (
    <Background>
      <Question>
        Shall we play a game?
      </Question>
      <Answer onClick={() => setShowGame(true)}>
        Yes
      </Answer>
      
      <Answer onClick={() => {window.location.href = '/'}}>
        No
      </Answer>
      
    </Background>
  )
}

const gameMap = [
  [0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 0, 1, 0],
]

const player = {
  location: { x: 2, y: 2 } 
}

const events = [
  {
    name: 'keydown',
    actions: [
      (e) => {
        switch(e.key) {
          case 'ArrowUp': {
            if (gameMap[player.location.y - 1]?.[player.location.x] != 1) return
            player.location.y -= 1
            break
          }
          case 'ArrowRight': {
            if (gameMap[player.location.y]?.[player.location.x + 1] != 1) return
            player.location.x += 1
            break
          }
          case 'ArrowDown': {
            if (gameMap[player.location.y + 1]?.[player.location.x] != 1) return
            player.location.y += 1
            break
          }
          case 'ArrowLeft': {
            if (gameMap[player.location.y]?.[player.location.x - 1] != 1) return
            player.location.x -= 1
            break
          }
        }
      }
    ]
  }
]

const canvasDrawer = new CanvasDrawer((ctx: CanvasContext, canvasRef) => {
  canvasDrawer.drawnSquares = 0

  const canvas = canvasRef.current

  if (!canvas) return

  const context = canvas.getContext('2d')

  context.canvas.width = window.innerWidth
  context.canvas.height = window.innerHeight

  

  const center = {
    width: Math.floor(window.innerWidth / 2) + (0 - player.location.x * canvasDrawer.tileSize.width - Math.floor(canvasDrawer.tileSize.width / 2)),
    height: Math.floor(window.innerHeight / 2) + ( 0 - player.location.y * canvasDrawer.tileSize.height - Math.floor(canvasDrawer.tileSize.height / 2))
  }

  ctx.drawer.xOffset = center.width
  ctx.drawer.yOffset = center.height

  context.translate(center.width, center.height)

  
  const size = canvasDrawer.tileSize

  const x = Math.floor((ctx.mouseHandler.mouseLocation.x - ctx.drawer.xOffset) / ctx.drawer.tileSize.width)
      const y = Math.floor((ctx.mouseHandler.mouseLocation.y - ctx.drawer.yOffset) / ctx.drawer.tileSize.height)

  const grid = {
    xstart: Math.floor(-canvasDrawer.xOffset / size.width) - 1,
    xend: Math.floor((-canvasDrawer.xOffset + canvas.width) / size.width) + 1,
    ystart: Math.floor(-canvasDrawer.yOffset / size.height) - 1,
    yend: Math.floor((-canvasDrawer.yOffset + canvas.height) / size.height) + 1
  }
  
  gameMap.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 0) return
      const coord = { x, y }
      if (coord.x <= grid.xend && coord.x >= grid.xstart && coord.y <= grid.yend && coord.y >= grid.ystart) {
        context.fillStyle = 'white'
        context.fillRect(coord.x * size.width, coord.y * size.height, size.width, size.height)
        if (player.location.x == coord.x && player.location.y == coord.y) {
          context.fillStyle = 'red'
          context.fillRect(coord.x * size.width + 2.5, coord.y * size.height + 2.5, size.width - 5, size.height - 5)
        } 
          
        
      }
    })

    
  })

  if (mapPointExists({x, y})) {
    if (x != player.location.x || y != player.location.y) {
      context.fillStyle = 'green'
      context.fillRect(x * size.width, y * size.height, size.width, size.height)
    }
    
  } 
  

  

})

function getProjectedMovementPoints(at: { x: number, y: number }) {
  
  return [
    {

    }
  ]
}

function mapPointExists(point: {x: number, y: number}) : boolean {
  if (gameMap[point.y]) {
    if (gameMap[point.y][point.x]) {
      return true
    }
  }

  return false
}


const canvasContext = new CanvasContext(canvasDrawer, events, (ctx: CanvasContext) => {
  ctx.mouseHandler.addMouseMoveAction(
    () => {
      const x = Math.floor((ctx.mouseHandler.mouseLocation.x - ctx.drawer.xOffset) / ctx.drawer.tileSize.width)
      const y = Math.floor((ctx.mouseHandler.mouseLocation.y - ctx.drawer.yOffset) / ctx.drawer.tileSize.height)
      
      if (mapPointExists({x, y})) {
        ctx.tileHighlighted = true
        ctx.draw()
      } else if (ctx.tileHighlighted) {
        ctx.draw()
        ctx.tileHighlighted = false
      }
  })
})

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  background: black;

  flex-flow: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Question = styled.div`
  font-family: 'DOS';
  font-size: 2em;
  color: green;

  margin-bottom: 1em;

`

const Answer = styled.div`
  font-family: 'DOS';
  font-size: 1.5em;
  color: green;


  margin: 0 0 .5em 0;
  padding: .25em .5em .25em .5em;

  border: 2px solid black;

  :hover {
    border: 2px solid green;
    cursor: pointer;
  }
`