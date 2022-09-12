/**
 * Class to represent and x and y coordinate.
 */
export default class Position {
  x: number;

  y: number;

  /**
   * Create a Position at the given x and y.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
