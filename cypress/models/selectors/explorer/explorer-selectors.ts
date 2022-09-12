export default class ExplorerSelectors {
  static readonly AddFieldButton = '[data-index="0"] > .title > [data-prompt="DataModalNewFieldPlusButton"]';

  static readonly ExplorerSidebar = '.table-builder-sidebar';

  static readonly SaveButton = '[data-prompt="DataModelSaveProjectButton"]';

  static readonly SecondGridTitle = '[data-index="1"] > .title > .text';

  // Add new grid
  static readonly AddGridButton = '[title="New Table"]';

  // Edit new grid
  static readonly AddFieldSecondGrid = '[data-index="1"] > .title > .entity-btn-new';

  // Add reference field modal
  static readonly FieldSelectDropdown = '.dropdown__selected';

  static readonly SelectANewReferenceField = '.button';

  static readonly SaveReferenceModal = '.buttons > .btn';

  // Delete grid
  static readonly DeleteSecondGrid = '[data-index="1"] > .title > .entity-btn-delete';

  // Fields
  static readonly FirstFieldInSecondGridInput = '[data-index="1"] > .fields > ul > li > .field-name > input';

  static readonly SecondFieldName = ':nth-child(2) > .field-name';

  static readonly ChangeFieldType = '#TourChangeFieldType';

  static readonly TextField = '[data-icon-list-item-name="Text"]';

  static readonly ListField = '[data-icon-list-item-name="List"]';

  // Field Settings
  static readonly DeleteButton = '.inline-buttons__btn';
}
