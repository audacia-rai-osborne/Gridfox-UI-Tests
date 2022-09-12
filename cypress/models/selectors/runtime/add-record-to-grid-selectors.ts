export default class AddRecordToGridSelectors {
  static readonly FirstField = '[data-test=form-field] > input';

  static readonly FirstFieldInModal = ':nth-child(1) > .form-field-table > .form-field-table__row > [data-test=form-field] > input';

  static readonly SecondField = 'div:nth-child(2) > div > div > [data-test=form-field] > input';

  static readonly SaveButton = '.save-button';

  static readonly NewRecordSaveButton = 'runtime-top-panel__new-row-button';

  static readonly PageBackdrop = '.backdrop';

  static EditableField(editableField: string): string {
    return `[data-component-field-id="${editableField}"]`;
  }

  static AddDataToField(fieldName: string): string {
    return `[data-test=form-field][data-test-detail="${fieldName}"]`;
  }

  static GetDatePickerForField(fieldName: string): string {
    return `[data-test="form-field"][data-test-detail="${fieldName}"] > .datepicker > input`;
  }

  static CheckCheckboxField(fieldName: string): string {
    // eslint-disable-next-line max-len
    return `[data-test="form-field"][data-test-detail="${fieldName}"] > div > .jasper-checkbox > label`;
  }
  // Child record

  static readonly AddChildRecord = '.add-child';

  static readonly AddNewChildRecord = 'add-new-child-options__add-new';

  static readonly AddExistingChildRecord = 'add-new-child-options__add-existing';

  static readonly SaveChildButton = 'add-existing-child-modal__save';

  // Parent record

  static readonly NewParentRecordButton = 'parent-field__new-parent-button';

  static readonly ExistingParentRecord = '.edit';

  static readonly FirstFieldInParentRecord = '.modal__fields > .field > .form-field-table > .form-field-table__row > [data-test=form-field]';

  static readonly ApplyButton = 'create-record-modal__apply';

  static ParentRecordInSetParentDropdown(idFieldValue: string): string {
    return `[data-test="parent-field__select-existing"][data-test-detail="${idFieldValue}"]`;
  }

  // Editing Many to Many records

  static EditableFieldInModal(editableFieldName: string): string {
    // eslint-disable-next-line max-len
    return `[data-prompt="CreateRecordModalForm"] > div > div > div > [data-test="form-field"][data-test-detail="${editableFieldName}"]`;
  }

  static readonly CreateLinkedRecordForExistingRecordButton = 'create-record-modal__save';
}
