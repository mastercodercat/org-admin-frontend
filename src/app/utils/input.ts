import { FormControl } from '@angular/forms';

/**
 * Custom validator to check if the passwords match the requirements
 *
 */
export const passwordValidator = (control: FormControl): { [s: string]: boolean } => {
  const value: string = (control.value as string) || '';
  const validator: { [s: string]: boolean } = {};

  if (value.length < 8) {
    validator.length = true;
  }
  if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)) {
    validator.special = true;
  }
  if (!/\d/.test(value)) {
    validator.num = true;
  }
  if (!/[a-z]/.test(value)) {
    validator.lowercase = true;
  }
  if (!/[A-Z]/.test(value)) {
    validator.uppercase = true;
  }

  return validator;
};
