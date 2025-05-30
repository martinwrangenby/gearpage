import { checkFieldValidity, validateInstrumentData } from './validation';

// Mock gearFormRules for testing validateInstrumentData
const mockGearFormRules = {
  name: {
    label: 'Name',
    rules: { mandatory: true },
  },
  type: {
    label: 'Type',
    rules: { mandatory: true },
  },
  description: {
    label: 'Description',
    rules: { mandatory: false },
  },
  price: {
    label: 'Price',
    rules: { mandatory: false },
  },
};

describe('checkFieldValidity', () => {
  test('returns true when no rules provided', () => {
    expect(checkFieldValidity('anything')).toBe(true);
    expect(checkFieldValidity('')).toBe(true);
    expect(checkFieldValidity(null)).toBe(true);
  });

  test('mandatory rule with non-empty string passes', () => {
    expect(checkFieldValidity('hello', { mandatory: true })).toBe(true);
  });

  test('mandatory rule with empty string fails', () => {
    expect(checkFieldValidity('', { mandatory: true })).toBe(false);
    expect(checkFieldValidity('   ', { mandatory: true })).toBe(false);
  });

  test('mandatory rule with non-string value passes if not null/undefined', () => {
    expect(checkFieldValidity(42, { mandatory: true })).toBe(true);
    expect(checkFieldValidity(true, { mandatory: true })).toBe(true);
    expect(checkFieldValidity({}, { mandatory: true })).toBe(true);
  });

  test('mandatory rule with null or undefined fails', () => {
    expect(checkFieldValidity(null, { mandatory: true })).toBe(false);
    expect(checkFieldValidity(undefined, { mandatory: true })).toBe(false);
  });
});

describe('validateInstrumentData', () => {
  test('valid instrument passes validation', () => {
    const instrument = {
      name: 'Guitar',
      type: 'string',
      description: 'Nice guitar',
      price: 1000,
    };
    const { isValid, errors } = validateInstrumentData(instrument, mockGearFormRules);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('missing mandatory fields cause validation to fail with appropriate errors', () => {
    const instrument = {
      name: '',   // empty mandatory
      type: null, // null mandatory
      description: 'desc', // optional
      price: 200, // optional
    };
    const { isValid, errors } = validateInstrumentData(instrument, mockGearFormRules);
    expect(isValid).toBe(false);
    expect(errors).toHaveProperty('name');
    expect(errors).toHaveProperty('type');
    expect(errors.name).toBe('Name is invalid or required.');
    expect(errors.type).toBe('Type is invalid or required.');
    // optional fields should NOT cause errors
    expect(errors).not.toHaveProperty('description');
    expect(errors).not.toHaveProperty('price');
  });

  test('missing optional fields do not cause validation failure', () => {
    const instrument = {
      name: 'Bass',
      type: 'string',
      description: undefined,
      price: null,
    };
    const { isValid, errors } = validateInstrumentData(instrument, mockGearFormRules);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('extra fields not in rules are ignored', () => {
    const instrument = {
      name: 'Piano',
      type: 'keyboard',
      description: '',
      price: 0,
      color: 'black',  // extra field
    };
    const { isValid, errors } = validateInstrumentData(instrument, mockGearFormRules);
    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
});
