export default class EditGridInRuntimeSelectors {
  static readonly AddFieldPlusButton = 'runtime-builder__new-field';

  static readonly Content = '.content';

  static readonly SaveButton = 'runtime-editor-bar__save';

  static readonly RuntimeSaveRecordButton = '[data-prompt="RuntimeSaveRecordButton"]';

  static readonly HistoryButton = '.history-button';

  static readonly FirstLinkedRecord = '[style="transform: translateY(0px);"] > .tr > [data-cell-index="0"] > .row-link';

  static readonly LinkToParentRecord = '.selected__link > a';

  static readonly FirstField = 'form-field';

  static readonly FirstFieldsCheckbox = '[style="transform: translateY(0px);"] > .tr > .row-selector > .checkbox';

  static readonly FirstListField = 'button.selected';

  static readonly SelectThirdItemInListField = ':nth-child(3) > button';

  static readonly SelectThirdItemInOpenListField = 'ul > :nth-child(3) > button';

  static readonly SaveButtonAddChild = 'create-record-modal__save';

  static readonly BackButton = '.edit-navbar__block--back-button';

  static readonly UnlinkSelectedButton = 'table-mode__unlink-selected';

  static readonly ParentFieldNotSet = 'parent-field__select-not-set';

  static readonly LoadingSpinner = '.spinner';

  static readonly NoResultsInGridMessage = '.no-results';

  static readonly EditPageGrid = '.edit-page-grid';

  static CreateChildFields(fieldName: string): string {
    return `[data-test="${this.FirstField}"][data-test-detail="${fieldName}"]`;
  }

  static EditDataInTextField(fieldName: string): string {
    return `[data-test=form-field][data-test-detail="${fieldName}"] > input`;
  }

  static EditDataInTextAreaField(fieldName: string): string {
    return `[data-test=form-field][data-test-detail="${fieldName}"] > .medium-textarea`;
  }

  static Field(fieldName: string): string {
    return `[data-test=form-field][data-test-detail="${fieldName}"]`;
  }
}
