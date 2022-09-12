export default class GridRuntimeSelectors {
  static readonly CellValue = '.cell__value';

  static readonly AddRowButton = 'runtime-top-panel__new-row-button';

  static readonly AddNewRowInGrid = '.add-new-record-cell';

  static readonly DeleteRecordsButton = 'table-mode__delete-selected';

  static readonly RowLink = '.row-link';

  static readonly SelectRow = 'table-mode__select-row';

  static readonly RuntimeSearchScreen = '.runtime-search-screen';

  static readonly FirstColoumnInGrid = 'runtime-table__cell cell--first-column';

  static readonly CellInGrid = 'runtime-table__cell';

  static Row(documentId: string): string {
    return `[data-row-id="${documentId}"]`;
  }

  static FirstColumnInRow(documentId: string): string {
    // eslint-disable-next-line max-len
    return `[data-test="${this.SelectRow}"][data-test-detail="${documentId}"][class="${this.FirstColoumnInGrid}"]`;
  }

  static readonly FirstRecordInGrid = '[style="transform: translateY(0px);"] > .tr > [data-cell-index="0"] > .row-link';

  static readonly SecondRecordInRelatedGrid = '[style="transform: translateY(35px);"] > .tr > [data-cell-index="0"] > .row-link';

  static readonly SecondRecordInRelatedGridCheckbox = '[style="transform: translateY(35px);"] > .tr > .row-selector > .checkbox';

  static readonly ThirdRecordInRelatedGridCheckbox = '[style="transform: translateY(70px);"] > .tr > .row-selector > .checkbox';

  static readonly ThirdFieldInput = ':nth-child(2) > .form-field-table > .form-field-table__row > [data-test=form-field] > input';

  static readonly SaveAndCloseButton = '.desktop-only';

  static readonly SaveButton = '.save-button';

  // Record height selectors
  static readonly GridDisplayModeSmall = 'grid-display-mode-Small';

  static readonly GridDisplayModeMedium = 'grid-display-mode-Medium';

  static readonly GridDisplayModeLarge = 'grid-display-mode-Large';

  // Record display mode selectors
  static readonly SmallDisplayMode = '[display-mode="Small"]';

  static readonly MediumDisplayMode = '[display-mode="Medium"]';

  static readonly LargeDisplayMode = '[display-mode="Large"]';
}
