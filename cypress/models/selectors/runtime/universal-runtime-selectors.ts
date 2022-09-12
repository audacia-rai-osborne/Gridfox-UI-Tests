export default class UniversalRuntimeSelectors {
  static readonly OpenViewEditor = 'create-new-screen__edit-current-view';

  static readonly CloseViewEditor = 'runtime-editor-bar__exit';

  static readonly ExplorerButton = '[data-prompt="EditorTableBuilderButton"]';

  static readonly AutomateButton = '[data-prompt="EditorWorkflowsButton"]';

  static readonly UsersButton = '[data-prompt="EditorPermissionsButton"]';

  static readonly FormsPageButton = '[data-prompt="EditorFormsButton"]';

  static readonly ProjectTitle = '.main-title';

  static readonly QuickSearchButton = '#regionalSearchInput';

  static readonly NewGridButton = 'create-new-screen__table-grid';

  static readonly NewBoardButton = 'create-new-screen__board';

  static readonly NewCalendarButton = 'create-new-screen__calendar';

  static readonly NewGanttChartButton = 'create-new-screen__gantt';

  static readonly SubmitScreenNameButton = '.input-button__submit';

  static readonly AddRecord = 'add-record';

  static readonly NoResults = '.no-results';

  static readonly ErrorTooltip = '.error-tooltip';

  static Screen(screenName: string): string {
    return `[data-test="sidebar__item-screen"][data-test-detail="${screenName}"]`;
  }

  static readonly FieldDropdown = '.field-dropdown';

  static readonly BackToProjectsButton = '.back-to-projects';

  static readonly ValidationMessageBoards = '.validation-msg';

  // Add Record in modal
  static readonly FirstFormFieldInput = ':nth-child(1) > .form-field-table > .form-field-table__row > [data-test=form-field] > input';

  static readonly SaveNewRecordInModal = 'create-record-modal__save';

  // Filtering
  static readonly OpenFilterButton = 'open-filter';

  static readonly FirstFieldInSearchInput = '.filter-field-value > input';

  static readonly AddConditionButton = '.add-condition-button';

  static readonly OpenFilterDropdownButton = '.inline-dropdown__selected';

  static readonly SelectFieldsToFilterBy = '.cell > .g-form-control > .inline-dropdown > .inline-dropdown__selected';

  static readonly ApplyFilterButton = '.button--apply';

  static readonly FilterConditionDropdown = '.range-search-type-text';

  static readonly HasAnyOfCondition = '[data-icon-list-item-name="has any of"]';

  static readonly IsUnsetCondition = '[data-icon-list-item-name="is unset"]';

  static readonly ParentFieldFilterDropdown = ':nth-child(2) > .inline-dropdown > .inline-dropdown__selected';

  static readonly FilterModal = '.global-filter-dropdown__container';

  // Save Filters
  static readonly ClickOnSaveFilter = 'sidebar__item-filter';

  static readonly OpenSaveFilterModal = '.button--save';

  static readonly SaveFilterNameInput = '.block > input';

  static readonly SaveFilterButton = '.modal__actions > .btn';

  // Save Changes confirmation modal
  static readonly DiscardChangesButton = 'discard';

  static readonly CancelChangesButton = '.buttons > :nth-child(1)';

  static readonly SaveChangesButton = '.buttons > .gridfox-button--green';

  // Remove Modal
  static readonly RemoveModalTitle = '.remove-modal-content';

  static readonly RemoveModalFirstLine = '.remove-modal-content > ul > :nth-child(1)';

  static readonly RemoveModalSecondLine = '.remove-modal-content > ul > :nth-child(2)';

  static readonly RemoveModalThirdLine = '.remove-modal-content > ul > :nth-child(3)';

  static readonly RemoveModalFourthLine = '.remove-modal-content > ul > :nth-child(4)';

  static readonly RemoveModalFifthLine = '.remove-modal-content > ul > :nth-child(5)';

  static readonly RemoveModalSixthLine = '.remove-modal-content > ul > :nth-child(6)';
}
