import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
@Directive({
    selector: '[appPasswordMatch]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordMatchDirective,
        multi: true,
    }]
})
export class PasswordMatchDirective implements Validator {

    constructor() { }
    @Input() pass1: AbstractControl;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.pass1 ? matchingPasswordValidator(this.pass1)(control) : null;
    }


}

export function matchingPasswordValidator(password: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const alowed = password.value != control.value;
        return alowed ? { 'noMatch': true } : null;
    };
}