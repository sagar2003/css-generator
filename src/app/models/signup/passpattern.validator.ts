import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PassPatternValidator:ValidatorFn=(control:AbstractControl):ValidationErrors|null=>{
    const pass = control;
    if(pass.value.length<6){
        return {LengthError:true}
    }
    var format = /[ ]/
    if(format.test(pass.value)){
        return {SpaceError:true}
    }
    format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!format.test(pass.value)){
        return {SpecialCharError:true}
    }

    return null;
}