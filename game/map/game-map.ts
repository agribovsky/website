import { Coor } from "../coor";
import { BaseLandGenerator, BaseLandType } from "./base-land";


export class GameMap {
 
  gameMap: BaseLandGenerator = new BaseLandGenerator()

  constructor() {
    this.gameMap.growAmount(500, BaseLandType.land, 0.5)
    this.gameMap.growAmount(200,  BaseLandType.scaffold, 0.5)
    this.gameMap.growAmount(300, BaseLandType.land, 0.5)
  }
  


  getAllPoints() : number[][] {
    return []
  }


  getPointAt(point: Coor) : number | null {
    if (this.gameMap.checkForPoint(point)) return 1
    return null
  }
}




// const gameMap: number[][] = [
//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//   [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//   [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
//   [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
//   [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0],
//   [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1],
//   [0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
//   [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
//   [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
//   [1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
//   [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0]
// ]