export default class FormSelectors {
  static readonly NewFormsButton = '.project-forms__header > .btn';

  static readonly FormDesigner = '.form-designer';

  static readonly FormNameField = '.column.column--toolkit > div:nth-child(1) > div > input';

  static SelectATableInDropdown(tableName: string): string {
    return `[data-test-detail="${tableName}"]`;
  }

  static readonly FormTitle = '.form-title [contenteditable]';

  static readonly FormDescription = '.form-description [contenteditable]';

  static readonly FormTableDropdown = 'select-from-list__dropdown-value';

  static readonly FormSaveButton = '.btn-container--share > .gridfox-button';

  static readonly FormsPreviewButton = '.buttons > :nth-child(1)';

  static SelectAFormField(fieldId: string): string {
    return `[data-field-id="${fieldId}"] > .form-field__container > .form-field__field-content`;
  }

  static SelectAFormFieldOriginalName(fieldId: string): string {
    // eslint-disable-next-line max-len
    return `[data-field-id="${fieldId}"] > .form-field__container > .form-field__info > .form-field__info-field-name`;
  }

  static SelectFormPreviewField(fieldId: string): string {
    // eslint-disable-next-line max-len
    return `[data-field-id="${fieldId}"] > .form-field__container > .form-field__field-content > .form-field__component > .g-form-field > input`;
  }

  static FormFieldRequiredToggle(fieldId: string): string {
    return `[data-field-id="${fieldId}"] .set-required`;
  }

  static OpenFieldAdvancedSettings(fieldId: string): string {
    return `[data-field-id="${fieldId}"] [data-test="form-designer-field__settings-btn"]`;
  }

  static readonly FormFields = '.form-fields';

  static readonly RequiredField = '.required';

  static readonly FormSubmissionMessage = '.g-form-control > .editor > .editor__tiptap > [data-v-393d080d=""] > .ProseMirror';

  static readonly BackToAllFormsButton = '.header__center > .router-link-active';

  static readonly CellFormName = '.cell--form-name';

  static readonly FormOptionMenu = '.cell--options';

  static readonly DeleteForm = 'right-click-menu__delete-form';

  // Default Text
  static readonly DefaultValueInput = '.advanced-settings__option > .g-form-control > .g-form-control__input';

  // Input fields
  static readonly SelectedListFieldValue = '.inline-dropdown__selected';

  static readonly RichTextInput = '.advanced-settings__option > .editor > .editor__tiptap > [data-v-393d080d=""] > .ProseMirror';

  static readonly PreviewRichTextInput = '.form-field__component .ProseMirror';

  static readonly PercentageFieldInput = '.form-field__advanced-settings > div > div > div.g-form-field > input';

  static readonly TextAreaFieldInput = 'textarea';

  static readonly SetDefaultValueCheckbox = 'label';

  static readonly CheckedCheckbox = '.checked';
}
