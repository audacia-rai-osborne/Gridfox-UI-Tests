export default {
  Date: {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,

  DateTime: {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as Intl.DateTimeFormatOptions,

  DateWithLongMonth: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,

  DateWithShortMonth: {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,

  DateTimeWithShortMonth: {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as Intl.DateTimeFormatOptions,

  DateWithLongMonthAndDay: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  } as Intl.DateTimeFormatOptions,

  DayAndMonth: {
    day: 'numeric',
    month: 'long',
  } as Intl.DateTimeFormatOptions,

  Month: {
    month: 'short',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,

  Year: {
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,
};
