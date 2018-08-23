import { Directive, Input } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appIdenticalTo]',
  providers: [{provide: NG_VALIDATORS, useExisting: IdenticalToValidatorDirective, multi: true}]
})
export class IdenticalToValidatorDirective implements Validator {
  @Input('appIdenticalTo') target: string;

  validate(control: AbstractControl): { [Key: string]: any } | null {
    return this.target ? identicalToValidator(this.target)(control) : null;
  }
}

export function identicalToValidator(target: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let validation: { [key: string]: any } | null = null;
    const originVal = control.value;

    if (originVal && control.parent) {
      const targetVal = control.parent.get(target).value;

      if (originVal !== targetVal) {
        validation = { 'identicalTo': true };
      }
    }

    return validation;
  };
}
