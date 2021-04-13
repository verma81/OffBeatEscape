import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordValidatorDirective,
      multi: true
    }
  ]
})

/**
  * @memberof SettingsComponent
  * directive to compare password with confrim passwrord field
*/
export class PasswordValidatorDirective implements Validator {

  constructor(@Attribute('appPasswordvalidator') public PasswordControl: string) { }

  validate(c: FormControl) {

    const password = c.root.get(this.PasswordControl);
    const confirmPassword = c;

    if (!password || !confirmPassword) {
      return null;
    }

    return password && password.value !== confirmPassword.value ? { passwordMatchError: true } : null;
  }

}
