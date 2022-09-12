export default class GanttEditViewSelectors {
  static SelectTable(tableName: string): string {
    return `[data-test="select-gantt-table"] [data-test-detail="${tableName}"]`;
  }

  static SelectField(fieldName: string): string {
    return `[data-test-detail="${fieldName}"]`;
  }

  static SelectName(fieldName: string): string {
    return `[data-test="select-gantt-table"] [data-test-detail="${fieldName}"]`;
  }

  static SelectedListOption(fieldName: string): string {
    return `[data-test="select-from-list__option-active"][data-test-detail="${fieldName}"]`;
  }

  static readonly GanttTitleField = 'gantt-setting__TITLE_FIELD';

  static readonly Button = '.controls > .btn';

  static readonly NextButton = '[data-prompt="CreateGanttNextButton"]';
}
