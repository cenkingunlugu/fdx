import { AbstractControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}
export class PasswordValidator {
  public static noNameSurname(control: AbstractControl): ValidationResult | null {
    const hasNoName = !control.value.includes(control.parent?.value.name);
    const hasNoSurName = !control.value.includes(control.parent?.value.name);
    const valid = hasNoName && hasNoSurName;
    if (!valid) {
      return { noNameSurname: true };
    }
    return null;
  }

  public static upperAndLower(control: AbstractControl): ValidationResult | null {
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const valid = hasUpper && hasLower;
    if (!valid) {
      return { upperAndLower: true };
    }
    return null;
  }
}
