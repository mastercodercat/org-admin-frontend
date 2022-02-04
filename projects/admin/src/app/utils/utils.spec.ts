import { passwordValidator } from './input';
import { FormControl } from '@angular/forms';

describe('PasswordValidator', () => {
  it('should validate password', () => {
    const control = new FormControl();
    control.setValue('');
    const result = passwordValidator(control);
    expect(result.length).toBeTrue();
    expect(result.special).toBeTrue();
    expect(result.num).toBeTrue();
    expect(result.lowercase).toBeTrue();
    expect(result.uppercase).toBeTrue();
  });
});
