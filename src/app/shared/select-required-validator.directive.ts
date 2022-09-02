import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[appSelectValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]

})

export class SelectRequiredValidatorDirective implements Validator {
    validate(control: AbstractControl<any, any>): { [key: string]: any } | null {
        return control.value === "default" ? { "defaultSelected": true } : null
    }
}