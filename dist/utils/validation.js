export function validate(input) {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value <= input.max;
    }
    if (input.minLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.trim().length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.trim().length <= input.maxLength;
    }
    return isValid;
}
//# sourceMappingURL=validation.js.map