/**
 * Validate a single field's value based on rules
 * @param {any} value - The input value
 * @param {Object} rules - Validation rules for the field
 * @returns {boolean} - True if valid
 */
export const checkFieldValidity = (value, rules = {}) => {
  let isValid = true;

  if (rules.mandatory) {
    isValid = typeof value === 'string'
      ? value.trim() !== '' && isValid
      : value !== null && value !== undefined && isValid;
  }
  return isValid;
};

/**
 * Validate a full instrument object against gearFormRules
 * @param {Object} instrumentData - { name, type, description, price, ... }
 * @param {Object} formRules - The gearFormRules definition
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateInstrumentData = (instrumentData, formRules) => {
  const errors = {};
  let isValid = true;

  for (const field in formRules) {
    const value = instrumentData[field];
    const { rules } = formRules[field];
    const fieldIsValid = checkFieldValidity(value, rules);
    if (!fieldIsValid) {
      isValid = false;
      errors[field] = `${formRules[field].label} is invalid or required.`;
    }
  }

  return { isValid, errors };
};
