export default class InlineEditorSelectors {
  static readonly InlineEditorToggle = '.toggle-switch__onoff';

  static readonly ActiveInlineEditorToggle = '.toggle-switch__onoff.active';

  static readonly SaveButton = '.save-inline-button';

  static readonly AddNewRecordButton = '.add-new-record-cell > .value';

  static readonly TextFieldInput = '.inline-text-field > input';

  static readonly TextFieldValue = '.inline-text-field__value';

  static readonly NumberFieldInput = '.inline-number-field > input';

  static readonly DatePickerInput = '.datepicker > input';

  static readonly URLFieldInput = '.inline-url-field > input';

  static readonly ToggleTextArea = '.toggle-textarea';

  static readonly TextAreaInput = 'textarea';

  static readonly ToggleRichTextField = '.inline-richtext-field__toggle-tiptap';

  static readonly RichTextInput = '.ProseMirror';

  static readonly CheckboxInput = 'label';

  static readonly FieldDropdown = '.inline-dropdown__selected';

  static readonly DisabledFieldTooltip = '.disabled-field-tooltip';

  static readonly ThirdRecord = '[style="transform: translateY(70px);"] > .tr > .row-selector';

  static readonly ThirdRecordCheckbox = '[style="transform: translateY(70px);"] > .tr > .row-selector > .checkbox';

  // Only applies for the all fields table

  static TextField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="3"] > .value`;
  }

  static TextAreaField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="7"] > .value`;
  }

  static RichTextField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="8"] > .value`;
  }

  static ListField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="4"] > .value`;
  }

  static UserField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="5"] > .value`;
  }

  static FormulaField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="6"] > .value`;
  }

  static NumberField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="9"] > .value`;
  }

  static PercentageField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="11"] > .value`;
  }

  static MoneyField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="10"] > .value`;
  }

  static DateField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="1"] > .value`;
  }

  static DateTimeField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="2"] > .value`;
  }

  static CheckboxField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="12"] > .value`;
  }

  static AutoCounterField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="13"] > .value`;
  }

  static URLField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="17"] > .value`;
  }

  static ParentLinkField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="18"] > .value`;
  }

  static ParentTextField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="19"] > .value`;
  }

  static GrandparentTextField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-cell-index="20"] > .value`;
  }

  static ManyToManyField(documentId: string): string {
    return `[data-row-id="${documentId}"] [data-last-field="true"] > .value`;
  }
}
