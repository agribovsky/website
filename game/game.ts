import { CanvasDrawer, CanvasContext, RectangleSize } from "../components/Canvas"
import { Coor, aStar } from "."
import { GameMap } from "./map"
import { getLineOfSight } from "./line-of-sight"

// import { Coor, aStar } from "."

// import { CanvasDrawer, CanvasContext } from "../components/Canvas"
// import { GameMap } from "./map"
// import { getLineOfSight } from "./line-of-sight"

// const gameMap = new GameMap()

// const player = {
//   location: new Coor(0, 0)
// }

// const events = [
//   {
//     name: 'keydown',
//     actions: [
//       (e) => {
//         switch(e.key) {
//           case 'ArrowUp': {
//             if (gameMap.getPointAt(new Coor(player.location.x, player.location.y - 1)) != 1) return
//             player.location.y -= 1
//             break
//           }
//           case 'ArrowRight': {
//             if (gameMap.getPointAt(new Coor(player.location.x + 1, player.location.y)) != 1) return
//             player.location.x += 1
//             break
//           }
//           case 'ArrowDown': {
//             if (gameMap.getPointAt(new Coor(player.location.x, player.location.y + 1)) != 1) return
//             player.location.y += 1
//             break
//           }
//           case 'ArrowLeft': {
//             if (gameMap.getPointAt(new Coor(player.location.x - 1, player.location.y)) != 1) return
//             player.location.x -= 1
//             break
//           }
//         }
//       }
//     ]
//   }
// ]



// const canvasDrawer = new CanvasDrawer((ctx: CanvasContext, canvasRef) => {
//   canvasDrawer.drawnSquares = 0

//   const canvas = canvasRef.current

//   if (!canvas) return

//   const context = canvas.getContext('2d')

//   context.canvas.width = window.innerWidth
//   context.canvas.height = window.innerHeight

//   const center = {
//     width: Math.floor(window.innerWidth / 2) + (0 - player.location.x * canvasDrawer.tileSize.width - Math.floor(canvasDrawer.tileSize.width / 2)),
//     height: Math.floor(window.innerHeight / 2) + ( 0 - player.location.y * canvasDrawer.tileSize.height - Math.floor(canvasDrawer.tileSize.height / 2))
//   }

//   ctx.drawer.xOffset = center.width
//   ctx.drawer.yOffset = center.height

//   context.translate(center.width, center.height)
  
//   const size = canvasDrawer.tileSize

  

//   const grid = {
//     xstart: Math.floor(-canvasDrawer.xOffset / size.width) - 1,
//     xend: Math.floor((-canvasDrawer.xOffset + canvas.width) / size.width) + 1,
//     ystart: Math.floor(-canvasDrawer.yOffset / size.height) - 1,
//     yend: Math.floor((-canvasDrawer.yOffset + canvas.height) / size.height) + 1
//   }
  
//   // gameMap.getAllPoints().forEach((row, y) => {
//   //   row.forEach((value, x) => {
//   //     if (value == 0) return
//   //     // context.globalAlpha = getRandomNumber(10, 100) / 100
//   //     const coord = { x, y }
//   //     if (coord.x <= grid.xend && coord.x >= grid.xstart && coord.y <= grid.yend && coord.y >= grid.ystart) {
//   //       context.fillStyle = 'white'
//   //       context.fillRect(coord.x * size.width, coord.y * size.height, size.width, size.height)
//   //       if (player.location.x == coord.x && player.location.y == coord.y) {
//   //         context.fillStyle = 'red'
//   //         context.fillRect(coord.x * size.width + 2.5, coord.y * size.height + 2.5, size.width - 5, size.height - 5)
//   //       }
//   //     }
//   //   })
//   // })

//   // player.location.scan(1).forEach(point => {
    
//   //   if (!gameMap[point.y] || !gameMap[point.y][point.x] || gameMap[point.y][point.x] == 0) return
//   //     const coord = point
//   //     if (coord.x <= grid.xend && coord.x >= grid.xstart && coord.y <= grid.yend && coord.y >= grid.ystart) {
//   //       context.fillStyle = 'white'
//   //       context.fillRect(coord.x * size.width, coord.y * size.height, size.width, size.height)
//   //       if (player.location.x == coord.x && player.location.y == coord.y) {
//   //         context.fillStyle = 'red'
//   //         context.fillRect(coord.x * size.width + 2.5, coord.y * size.height + 2.5, size.width - 5, size.height - 5)
//   //       }
//   //     }
//   // })


//   const lineOfSight = getLineOfSight(player.location, gameMap, 10)
//   lineOfSight.push(player.location)
  
//   lineOfSight.forEach(point => {
//     if (gameMap.getPointAt(point) != 1) return
    
//         const coord = point
//         if (coord.x <= grid.xend && coord.x >= grid.xstart && coord.y <= grid.yend && coord.y >= grid.ystart) {
//           const xDiff = Math.abs(point.x - player.location.x)
//           const yDiff = Math.abs(point.y - player.location.y)
//           let ringLevel = xDiff > yDiff ? xDiff : yDiff
          
//           //console.log(player.location, point, xDiff, yDiff, ringLevel);

//           const alpha = 1 - ringLevel / 10
          
//           context.globalAlpha = alpha > 0 ? alpha : 0

//           context.fillStyle = '#E3BAAA'
//           context.fillRect(coord.x * size.width, coord.y * size.height, size.width, size.height)
//         }
//   })

//   context.globalAlpha = 1

//   context.fillStyle = 'green'
//   // context.fillRect(player.location.x * size.width + 2.5, player.location.y * size.height + 2.5, size.width - 5, size.height - 5)
//   context.arc(player.location.x * size.width + (size.width / 2), player.location.y * size.height + size.height / 2, (size.width / 3), 0, 2 * Math.PI, false)
//   context.fill()
//   // player.location.scan(2).forEach(point => {
//   //   context.fillStyle = 'purple'
//   //   context.fillRect(Math.floor(point.x * size.width + size.width / 4), Math.floor(point.y * size.height + size.height / 4), Math.floor(size.width / 2), Math.floor(size.height / 2))
//   // })


//   if (ctx.tileHighlighted && lineOfSight.filter(point => point.sameAs(ctx.tileHighlighted)).length > 0) {


//     const x = ctx.tileHighlighted.x
//     const y = ctx.tileHighlighted.y


//     if (gameMap.getPointAt(new Coor(x, y))) {
//       if (x != player.location.x || y != player.location.y) {
//         context.fillStyle = 'green'
//         context.fillRect(x * size.width, y * size.height, size.width, size.height)
//       }
      
//     } 

    
    
//     const newPoints = aStar(player.location, new Coor(x, y), gameMap)
    
//     console.log(newPoints);
  
//     if (!newPoints) {
//       console.log('no new points');
//       return
//     }
    
  
  
//     newPoints.forEach(point => {
//       if (player.location.sameAs(point)) return
//       context.fillStyle = 'green'
//         context.fillRect(Math.floor(point.x * size.width + size.width / 4), Math.floor(point.y * size.height + size.height / 4), Math.floor(size.width / 2), Math.floor(size.height / 2))
//     })


//     // getLine(player.location, ctx.tileHighlighted).forEach(point => {
//     //   context.fillStyle = 'blue'
//     //   context.fillRect(Math.floor(point.x * size.width + size.width / 4), Math.floor(point.y * size.height + size.height / 4), Math.floor(size.width / 2), Math.floor(size.height / 2))
//     // })


//   }
// })

// function movePlayer(i: number, steps: Coor[], ctx: CanvasContext) {
//   if (!steps) { ctx.enableUserInteraction(); return }
//   player.location = steps[i]
//   ctx.draw()

//   if (i + 1 == steps.length) {
//     ctx.enableUserInteraction()
//     return
//   } else {
//     setTimeout(() => { movePlayer(i + 1, steps, ctx) }, 100)
//   }
// }

// export const canvasContext = new CanvasContext(canvasDrawer, events, (ctx: CanvasContext) => {
//   ctx.mouseHandler.addMouseMoveAction(
//     () => {
//       const x = Math.floor((ctx.mouseHandler.mouseLocation.x - ctx.drawer.xOffset) / ctx.drawer.tileSize.width)
//       const y = Math.floor((ctx.mouseHandler.mouseLocation.y - ctx.drawer.yOffset) / ctx.drawer.tileSize.height)
      
//       if (gameMap.getPointAt(new Coor(x, y))) {
//         if (!ctx.tileHighlighted || !ctx.tileHighlighted.sameAs(new Coor(x, y))) {
//           ctx.tileHighlighted = new Coor(x, y)
//           ctx.draw()
//         }
//       } else if (ctx.tileHighlighted) {
        
//         ctx.tileHighlighted = null
//         ctx.draw()
//       }
//   })

//   ctx.mouseHandler.addMouseDownAction(
//     () => {
//       if (ctx.tileHighlighted && getLineOfSight(player.location, gameMap).filter(point => point.sameAs(ctx.tileHighlighted)).length > 0) {

//         const steps = aStar(player.location, ctx.tileHighlighted, gameMap)

//         ctx.tileHighlighted = null

//         ctx.disableUserInteraction()
//         movePlayer(0, steps, ctx)
//       }
//     }
//   )

  
// })

const gameMap = new GameMap()

const player = {
  location: new Coor(0, 0)
}

const tileSize = {
  width: 25,
  height: 25,
}

const canvasDrawer = new CanvasDrawer((ctx: CanvasContext) => {
  const center = {
    width: Math.floor(window.innerWidth / 2) + (0 - player.location.x * tileSize.width - Math.floor(tileSize.width / 2)),
    height: Math.floor(window.innerHeight / 2) + ( 0 - player.location.y * tileSize.height - Math.floor(tileSize.height / 2))
  }

  ctx.drawer.offset = {
    x: center.width,
    y: center.height
  }

  ctx.drawer.translate()
    
  const size = tileSize

  const grid = {
    xstart: Math.floor(-ctx.drawer.offset.x / size.width) - 1,
    xend: Math.floor((-ctx.drawer.offset.x + ctx.drawer.canvasSize.width) / size.width) + 1,
    ystart: Math.floor(-ctx.drawer.offset.y / size.height) - 1,
    yend: Math.floor((-ctx.drawer.offset.y + ctx.drawer.canvasSize.height) / size.height) + 1
  }
    
    
  const lineOfSight = getLineOfSight(player.location, gameMap, 10)
  lineOfSight.push(player.location)
  
  lineOfSight.forEach(point => {
    if (gameMap.getPointAt(point) != 1) return
    
        const coord = point
        if (coord.x <= grid.xend && coord.x >= grid.xstart && coord.y <= grid.yend && coord.y >= grid.ystart) {
          const xDiff = Math.abs(point.x - player.location.x)
          const yDiff = Math.abs(point.y - player.location.y)
          let ringLevel = xDiff > yDiff ? xDiff : yDiff
          

          const alpha = 1 - ringLevel / 10
          
          ctx.drawer.drawRectangle(
            new Coor(coord.x * size.width, coord.y * size.height),
            new RectangleSize(size.width, size.height),
            '#E3BAAA',
            alpha
          )
        }
  })
    
  ctx.drawer.drawRectangle(
    new Coor(player.location.x * size.width, player.location.y * size.height),
    new RectangleSize(size.width, size.height),
    'green'
  )
    
      if (tileHighlighted && lineOfSight.filter(point => point.sameAs(tileHighlighted)).length > 0) {
        const x = tileHighlighted.x
        const y = tileHighlighted.y
    
    
        if (gameMap.getPointAt(new Coor(x, y))) {
          if (x != player.location.x || y != player.location.y) {
            ctx.drawer.drawRectangle(
              new Coor(x * size.width, y * size.height),
              new RectangleSize(size.width, size.height),
              'green'
            )
          }
          
        }
        
        const newPoints = aStar(player.location, new Coor(x, y), gameMap)
        
        if (!newPoints) {
          console.log('no new points');
          return
        }
        
        newPoints.forEach(point => {
          if (player.location.sameAs(point)) return
            ctx.drawer.drawRectangle(
              new Coor(Math.floor(point.x * size.width + size.width / 4), Math.floor(point.y * size.height + size.height / 4)),
              new RectangleSize(Math.floor(size.width / 2), Math.floor(size.height / 2)),
              'green'
            )
        })
      }
})

let tileHighlighted = null

function movePlayer(i: number, steps: Coor[], ctx: CanvasContext) {
  if (!steps) { ctx.enableUserInteraction(); return }
  player.location = steps[i]
  ctx.draw()

  if (i + 1 == steps.length) {
    ctx.enableUserInteraction()
    return
  } else {
    setTimeout(() => { movePlayer(i + 1, steps, ctx) }, 100)
  }
}


export const canvasContext = new CanvasContext(canvasDrawer, (ctx: CanvasContext) => {
  
  ctx.handleResize = (window) => {
    ctx.drawer.canvasSize = new RectangleSize(window.innerWidth, window.innerHeight)
    ctx.draw()
  }

  
  ctx.keyboardHandler.on('ArrowUp', {
    keydown: () => {
      if (gameMap.getPointAt(new Coor(player.location.x, player.location.y - 1)) != 1) return
      player.location.y -= 1
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('ArrowRight', {
    keydown: () => {
      if (gameMap.getPointAt(new Coor(player.location.x + 1, player.location.y)) != 1) return
      player.location.x += 1
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('ArrowDown', {
    keydown: () => {
      if (gameMap.getPointAt(new Coor(player.location.x, player.location.y + 1)) != 1) return
      player.location.y += 1
      ctx.draw()
    }
  })

  ctx.keyboardHandler.on('ArrowLeft', {
    keydown: () => {
      if (gameMap.getPointAt(new Coor(player.location.x - 1, player.location.y)) != 1) return
      player.location.x -= 1
      ctx.draw()
    }
  })


  ctx.mouseHandler.addMouseMoveAction(() => {
    const x = Math.floor((ctx.mouseHandler.mouseLocation.x - ctx.drawer.offset.x) / tileSize.width)
      const y = Math.floor((ctx.mouseHandler.mouseLocation.y - ctx.drawer.offset.y) / tileSize.height)
      
      if (gameMap.getPointAt(new Coor(x, y))) {
        if (!tileHighlighted || !tileHighlighted.sameAs(new Coor(x, y))) {
          tileHighlighted = new Coor(x, y)
          ctx.draw()
        }
      } else if (tileHighlighted) {
        
        tileHighlighted = null
        ctx.draw()
      }
  })

  ctx.mouseHandler.addMouseDownAction(() => {
    if (tileHighlighted && getLineOfSight(player.location, gameMap).filter(point => point.sameAs(tileHighlighted)).length > 0) {

      const steps = aStar(player.location, tileHighlighted, gameMap)

      tileHighlighted = null

      ctx.disableUserInteraction()
      movePlayer(0, steps, ctx)
    }
  })
})
