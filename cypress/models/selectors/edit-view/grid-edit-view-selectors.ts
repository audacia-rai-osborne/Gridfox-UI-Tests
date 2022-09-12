export default class GridEditViewSelectors {
  static readonly NoVisibleFields = '.no-visible-fields';

  static readonly TableNameInput = '.singular-table-name-input > input';

  static Field(fieldName: string): string {
    return `[data-component-field-name="${fieldName}"]`;
  }

  // Reference field modal
  static readonly RefFieldSetupModal = '.reference-field-setup__modal';

  static readonly RefFieldModalDropdown = '.dropdown__selected';

  static readonly GenerateNewRefField = '.reference-field-setup__modal > .entity-list > div > .options > div > ul > .button';

  static readonly SaveRefFieldButton = '[data-prompt="ReferenceFieldSetupSaveButton"]';

  // Table Settings

  static readonly FieldName = '.field-name > input';

  static readonly RefFieldCheckbox = ':nth-child(1) > .checkbox';

  static readonly DeleteFieldButton = '.inline-buttons__btn';

  static readonly FieldTypeIcon = '.field-type-icon > img';

  static readonly ConfigureFormulaButton = '.configure-computed-button';

  static readonly CurrencyDropdown = '.selected-type';

  static readonly TableSettingsInfo = '.info';

  static readonly SelectTableSettingsValue = '.show';

  // Field types in table settings

  static readonly TextAreaTableSettingsField = '[data-icon-list-item-name="Text Area"]';

  // Field Types in dropdown list

  static readonly MoneyFieldDropdownList = '[data-icon-list-item-name="Money"]';

  static readonly URLFieldDropdownList = '[data-icon-list-item-name="URL"]';

  static readonly FormulaFieldDropdownList = '[data-icon-list-item-name="Formula"]';

  // Field Types icons in fields

  static readonly TextAreaFieldImage = '[data-field-type="Text Area"]';

  // Formula Field Input
  static readonly FormulaInputField = '.function-input > input';

  static readonly FormulaBuilderButton = '.button';

  static readonly FormulaFieldValidMessage = '.valid';
}
