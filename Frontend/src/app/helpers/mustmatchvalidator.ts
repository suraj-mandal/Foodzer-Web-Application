import {FormGroup} from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustmatchvalidator) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustmatchvalidator: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
