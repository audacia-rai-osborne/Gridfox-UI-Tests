export default class KanbanEditViewSelectors {
  static readonly KanbanSettingsModal = '.kanban-settings';

  static SelectTable(tableName: string): string {
    return `[data-test-detail="${tableName}"]`;
  }

  static readonly NextButton = '.controls > .btn';

  static readonly NextButtonWhenBackButtonVisible = '[data-prompt="CreateKanbanNextButton"]';

  static readonly SaveButton = '.btn--secondary';

  static SelectField(fieldName: string): string {
    return `[data-test-detail="${fieldName}"]`;
  }

  static SelectFieldToDrag(fieldId: string): string {
    return `[data-id="${fieldId}"]`;
  }

  static readonly VisibleFieldsColumn = '.multiple-fields__column--visible > ul';

  static readonly ExitViewEditorButton = 'create-new-screen__edit-current-view';

  static readonly DeleteButton = 'runtime-editor-bar__delete';

  static readonly SaveModalButton = '.gridfox-button--green';

  static readonly SelectFromList = 'select-from-list__option';

  // Optional Steps

  static readonly SelectRowSettings = '.kanban-optional-settings-grid > :nth-child(4)';

  static readonly RemoveRowsOption = 'select-from-list__option--unset';
}
