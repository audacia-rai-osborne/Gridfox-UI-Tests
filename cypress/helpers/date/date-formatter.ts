import DateFormatOptions from './date-format-options';

/**
 * Format dates as strings.
 */
export default class DateFormatter {
  private date: Date;

  constructor(
    year: number,
    month: number,
    date: number,
    hours = 0,
    minutes = 0,
    seconds = 0,
  ) {
    this.date = new Date(year, month - 1, date, hours, minutes, seconds);
  }

  toDate(): string {
    return this.format(DateFormatOptions.Date);
  }

  toDateTime(): string {
    return this.format(DateFormatOptions.DateTime);
  }

  toDateWithLongMonth(): string {
    return this.format(DateFormatOptions.DateWithLongMonth);
  }

  toDateWithShortMonth(): string {
    return this.format(DateFormatOptions.DateWithShortMonth);
  }

  toDateTimeWithShortMonth(): string {
    return this.format(DateFormatOptions.DateTimeWithShortMonth);
  }

  toDateWithLongMonthAndDay(): string {
    return this.format(DateFormatOptions.DateWithLongMonthAndDay);
  }

  toDayAndMonth(): string {
    return this.format(DateFormatOptions.DayAndMonth);
  }

  toMonth(): string {
    return this.format(DateFormatOptions.Month);
  }

  toYear(): string {
    return this.format(DateFormatOptions.Year);
  }

  private format(options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(undefined, options).format(this.date);
  }
}
