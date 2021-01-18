import '../../../spec/helpers/enzyme';
import {
  hasMoreThanOneDifferentValue,
  hasMoreValues,
  hasInvalidKeyForRangeValue,
  blockDatesAfterToday,
  blockDaysBefore,
  blockDatesBefore,
  blockDateStartOutOfRange,
  blockDateEndOutOfRange,
  formatToDollarCurrency,
  isInvalidRangeValue,
  isValueOnOptionsLabel,
} from '.';
describe('hasMoreThanOneDifferentValue', () => {
  const baseArray = [
    'parentID',
    'batchID',
    'idocNumber',
    'cillUniqueIdentifier',
    'errorCode',
    'status',
  ];
  it('it should return false if one parameter key is passed', () => {
    expect(hasMoreThanOneDifferentValue(baseArray, ['parentID'])).toBe(false);
  });
  it('it should return false if two parameters key and multi value are passed', () => {
    expect(hasMoreThanOneDifferentValue(baseArray, ['parentID', 'batchID', '1,2,3'])).toBe(false);
  });
  it('it should return true if two parameters key, one multi value and a single value are passed', () => {
    expect(hasMoreThanOneDifferentValue(baseArray, ['parentID', 'batchID', '1,2,3', '1'])).toBe(
      true,
    );
  });
});
describe('hasMoreValues', () => {
  const baseArray = [
    'parentID',
    'batchID',
    'idocNumber',
    'cillUniqueIdentifier',
    'errorCode',
    'status',
  ];
  const maxValues = 3;
  it('it should return false if one parameter key is passed', () => {
    expect(hasMoreValues(baseArray, ['parentID'], maxValues)).toBe(false);
  });
  it('it should return false if two parameters key and multi value are passed', () => {
    expect(hasMoreValues(baseArray, ['parentID', 'batchID', '1,2,3'], maxValues)).toBe(false);
  });
  it('it should return true if more than 3 parameters are passed', () => {
    expect(
      hasMoreValues(baseArray, ['parentID', 'batchID', 'errorCode', 'status', '1,2,3'], maxValues),
    ).toBe(true);
  });
});
describe('hasInvalidKeyForRangeValue', () => {
  it('it should return false if range value is passed', () => {
    expect(hasInvalidKeyForRangeValue(['1-2'], '1-2')).toBe(false);
  });
  it('it should return false if errorCode parameter and range value are passed', () => {
    expect(hasInvalidKeyForRangeValue(['errorCode', '1-2'], '1-2')).toBe(false);
  });
  it('it should return true if errorCode and parentID parameters and range value are passed', () => {
    expect(hasInvalidKeyForRangeValue(['errorCode', 'parentID', '1-2'], '1-2')).toBe(true);
  });
  it('it should return true if parentId parameter and range value are passed', () => {
    expect(hasInvalidKeyForRangeValue(['parentID', '1-2'], '1-2')).toBe(true);
  });
});
describe('isInvalidRangeValue', () => {
  it('it should return true if range value not contains numbers', () => {
    expect(isInvalidRangeValue(['1-e'])).toBe(true);
  });
  it('it should return true if range value has not the format number-number', () => {
    expect(isInvalidRangeValue(['1-2-3'])).toBe(true);
  });
  it('it should return true if range value has not the format minNumber-maxNumber', () => {
    expect(isInvalidRangeValue(['2-1'])).toBe(true);
    expect(isInvalidRangeValue(['2-2'])).toBe(true);
  });
  it('it should return false if no range value is passed', () => {
    expect(isInvalidRangeValue([])).toBe(false);
  });
});
describe('isValueOnOptionsLabel', () => {
  const parameterKeyOptions = [
    { value: 'parentId', label: 'Parent ID' },
    { value: 'batchId', label: 'Batch ID' },
    { value: 'iDocNumber', label: 'IDoc Number' },
    { value: 'cillUId', label: 'CILL Unique Identifier' },
    { value: 'errorCode', label: 'Error Code' },
    { value: 'status', label: 'Status' },
  ];
  it('it should return true if a value matches with a parameterKeyOptions value', () => {
    expect(isValueOnOptionsLabel(parameterKeyOptions, ['Error Code'])).toBe(true);
  });
});
describe('blockDatesAfterToday', () => {
  it("it should return true when today's date is passed and we check a range of 13 days after", () => {
    const today = new Date();
    const thirtheenDaysAfterToday = new Date(today);
    thirtheenDaysAfterToday.setDate(thirtheenDaysAfterToday.getDate() + 13);
    expect(blockDatesAfterToday(thirtheenDaysAfterToday)).toBe(true);
  });
  it("it should return false when today's date is passed and we check a range of 13 days before", () => {
    const today = new Date();
    const thirtheenDaysBeforeToday = new Date(today);
    thirtheenDaysBeforeToday.setDate(thirtheenDaysBeforeToday.getDate() - 13);
    expect(blockDatesAfterToday(thirtheenDaysBeforeToday)).toBe(false);
  });
  it("it should return false today's date is passed", () => {
    const today = new Date();
    expect(blockDatesAfterToday(today)).toBe(false);
  });
});
describe('blockDaysBefore', () => {
  it("it should return false when today's date is passed and we check a range of 14 days before", () => {
    const today = new Date();
    expect(blockDaysBefore(today, 14)).toBe(false);
  });
  it('it should return false when a date of 13 days before today is passed and we check a range of 14 days before', () => {
    const today = new Date();
    const thirtheenDaysBeforeToday = new Date(today);
    thirtheenDaysBeforeToday.setDate(thirtheenDaysBeforeToday.getDate() - 13);
    expect(blockDaysBefore(thirtheenDaysBeforeToday, 14)).toBe(false);
  });
  it('it should return true when a date of 15 days before today is passed and we check a range of 14 days before', () => {
    const today = new Date();
    const fifteenDaysBeforeToday = new Date(today.getDate() - 15);
    expect(blockDaysBefore(fifteenDaysBeforeToday, 14)).toBe(true);
  });
  it("it should return false when tomorrow's date is passed and we check a range of 14 days before", () => {
    const today = new Date();
    const oneDayAfterToday = new Date(today);
    oneDayAfterToday.setDate(oneDayAfterToday.getDate() + 1);
    expect(blockDaysBefore(oneDayAfterToday, 14)).toBe(false);
  });
});
describe('blockDatesBefore', () => {
  it('it should return false when "current" and "date" are the same', () => {
    const today = new Date();
    expect(blockDatesBefore(today, today)).toBe(false);
  });
  it('it should return false when "current" is before "date"', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    expect(blockDatesBefore(today, yesterday)).toBe(false);
  });
  it('it should return true when "current" is after "date"', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    expect(blockDatesBefore(today, tomorrow)).toBe(true);
  });
});
describe('blockDateStartOutOfRange', () => {
  it("it should return false when today's date is passed", () => {
    const today = new Date();
    expect(blockDateStartOutOfRange(today)).toBe(false);
  });
  it('it should return true when a date after today is passed', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    expect(blockDateStartOutOfRange(tomorrow)).toBe(true);
  });
  it('it should return false when a date before today is passed', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    expect(blockDateStartOutOfRange(yesterday)).toBe(false);
  });
  it('it should return true when a date 15 days before today is passed', () => {
    const today = new Date();
    const fifteenDaysBeforeToday = new Date(today);
    fifteenDaysBeforeToday.setDate(today.getDate() - 15);
    expect(blockDateStartOutOfRange(fifteenDaysBeforeToday)).toBe(true);
  });
});
describe('blockDateEndOutOfRange', () => {
  describe('in a period of time from (today - 7 days) to today', () => {
    const today = new Date();
    const sevenDaysBeforeToday = new Date(today);
    sevenDaysBeforeToday.setDate(today.getDate() - 7);
    it("it should return false when today's date is passed", () => {
      expect(blockDateEndOutOfRange(today, sevenDaysBeforeToday)).toBe(false);
    });
    it('it should return true when tomorrows date is passed', () => {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      expect(blockDateEndOutOfRange(tomorrow, sevenDaysBeforeToday)).toBe(true);
    });
    it("it should return false when yesterday's date is passed", () => {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      expect(blockDateEndOutOfRange(yesterday, sevenDaysBeforeToday)).toBe(false);
    });
    it('it should return true when a date from 8 days before today is passed', () => {
      const eightDaysBeforeToday = new Date();
      eightDaysBeforeToday.setDate(today.getDate() - 8);
      expect(blockDateEndOutOfRange(eightDaysBeforeToday, sevenDaysBeforeToday)).toBe(true);
    });
  });
});
describe('formatToDollarCurrency', () => {
  it('it should return $1,000.00 if 1000 number is passed', () => {
    expect(formatToDollarCurrency(1000)).toBe('$1,000.00');
  });
  it('it should return $1,000.00 if 1000 string is passed', () => {
    expect(formatToDollarCurrency('1000')).toBe('$1,000.00');
  });
  it('it should return $4,000,000.00 if 4000000 string is passed', () => {
    expect(formatToDollarCurrency('4000000')).toBe('$4,000,000.00');
  });
  it('it should return $4,000,000.00 if 4000000 number is passed', () => {
    expect(formatToDollarCurrency(4000000)).toBe('$4,000,000.00');
  });
  it('it should return $1,035.15 if 1035.15 number is passed', () => {
    expect(formatToDollarCurrency(1035.15)).toBe('$1,035.15');
  });
  it('it should return $1,035.15 if 1035.15 string is passed', () => {
    expect(formatToDollarCurrency('1035.15')).toBe('$1,035.15');
  });
});
