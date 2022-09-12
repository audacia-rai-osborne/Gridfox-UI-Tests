export default class BoardRuntimeSelectors {
  static readonly AddColumnButton = 'kanban-new-column__add';

  static readonly AddColumnInput = 'kanban-new-column__name-input';

  static readonly SaveColumnButton = 'kanban-new-column__save';

  static readonly KanbanRows = '.row-name';

  static readonly KanbanBoard = '.kanban-grid__row';

  static AddNewCard(dataColumnId: string): string {
    return `[data-column-id="${dataColumnId}"] > .column-container > .column-new-btn > .btn`;
  }

  static Card(dataCardId: string): string {
    return `[data-card-id="${dataCardId}"]`;
  }

  /**
   * Gets the DOM string selector for the given Kanban Card in the given Column.
   * @param col The index of the column the card is in.
   * @param card The index of the card in the column.
   * @returns The DOM string selector for the card.
   */
  static getKanbanCard(col: number, card: number): string {
    return `
      [data-prompt="KanbanGridBlock"]:nth-child(${col})
      [data-prompt="KanbanCard"]:nth-child(${card})
    `;
  }
}
