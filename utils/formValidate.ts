import { FieldsType } from '../types/Types';

export const validateFields = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  bookingType?: 'instant' | 'scheduled' // Add optional bookingType parameter
): boolean => {
  let isValid = true;

  // Extract all field names once for efficiency
  const fieldNames = fields?.map((item: FieldsType) => item?.name) || [];

  setFields((prev) =>
    prev.map((field) => {
      let hasError = false;

      // Skip validation for scheduled fields if booking type is instant
      if (bookingType === 'instant') {
        if (field.name === 'scheduledDate' || field.name === 'scheduledTime') {
          return { ...field, error: false }; // Clear error and skip validation
        }
      }

      if (field.required && fieldNames.includes(field?.name)) {
        // 1. Check for String emptiness
        const isStringEmpty = typeof field.value === 'string' && field.value.trim() === '';

        // 2. Check for Undefined/Null
        const isNullOrUndefined = field.value === undefined || field.value === null;

        // 3. Check for Empty Arrays (GridInput / Images)
        const isArrayEmpty = Array.isArray(field.value) && field.value.length === 0;

        // Note: We EXCLUDE booleans from being "empty" because
        // false is a valid value for a checkbox, not a "missing" value.

        if (isStringEmpty || isNullOrUndefined || isArrayEmpty) {
          hasError = true;
          isValid = false;
        }
      }

      return { ...field, error: hasError };
    })
  );

  return isValid;
};
