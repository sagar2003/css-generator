import { AbstractControl, ValidationErrors, ValidatorFn, } from "@angular/forms";

export const ConfirmPassValidator:ValidatorFn=(control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('pass');
    const repass = control.get('repass');
    return pass?.value == repass?.value
    ? null
    : { PasswordNoMatch: true };
}