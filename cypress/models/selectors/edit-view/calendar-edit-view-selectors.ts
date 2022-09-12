export default class CalendarEditViewSelectors {
  static readonly CalendarNextButton = 'calendar-next-button';

  static SelectListOption(listOption: string): string {
    return `[data-test="select-from-list__option"][data-test-detail="${listOption}"]`;
  }

  static readonly CalendarSaveButton = 'calendar-save-button';
}
