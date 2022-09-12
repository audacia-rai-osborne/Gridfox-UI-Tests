import Position from '../models/helpers/position';

export default class DomHelper {
  /**
   * Gets the center of a DOM Rect relative to the window.
   * @param domRect The DOM Rect to get the center of.
   * @returns An x,y position representing the center of the DOM Rect relative to the window.
   */
  static getDomRectCenter(domRect: DOMRect): Position {
    const x = domRect.x + domRect.width / 2;
    const y = domRect.y + domRect.height / 2;

    return new Position(x, y);
  }

  /**
   * Gets the top left of a DOM Rect relative to the window.
   * @param domRect The DOM Rect to get the top left of.
   * @returns An x,y position representing the top left of the DOM Rect relative to the window.
   */
  static getDomRectTopLeft(domRect: DOMRect): Position {
    return new Position(domRect.x, domRect.y);
  }

  /**
   * Gets the center of a HTML Element relative to the window.
   * @param element The HTML Element to get the center of.
   * @returns An x,y position representing the center of the HTML Element relative to the window.
   */
  static getElementCenter(element: HTMLElement): Position {
    return this.getDomRectCenter(element.getBoundingClientRect());
  }

  /**
   * Gets the top left of a HTML Element relative to the window.
   * @param element The HTML Element to get the top left of.
   * @returns An x,y position representing the top left of the HTML Element relative to the window.
   */
  static getElementTopLeft(element: HTMLElement): Position {
    return this.getDomRectTopLeft(element.getBoundingClientRect());
  }
}
