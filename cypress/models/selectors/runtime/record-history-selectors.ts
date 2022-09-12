export default class RecordHistorySelectors {
  static readonly CloseHistoryLog = '.title > .close';

  static AuditRowName(columnNumber: string): string {
    return `.list > :nth-child(${columnNumber}) > .field-name`;
  }

  static FirstAuditRowValue(columnNumber:string): string {
    return `:nth-child(${columnNumber}) > .value > .value__inner-text`;
  }
}
