import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField( form: FormGroup, fieldname: string ): boolean | null {
    return (
      form.controls[fieldname].errors &&
      form.controls[fieldname].touched
    )
  }

  static getFieldError( myForm: FormGroup , fieldname: string ): string | null {
    if( !myForm.controls[fieldname] ) return null

    const errors = myForm.controls[fieldname].errors ?? {}
    return this.getErrorMessage(errors);
  }

  static isValidFieldArray(formArray: FormArray, index: number ): boolean | null {
    return (
      formArray.controls[index].errors &&
      formArray.controls[index].touched
    )
  }

  static getFieldArrayError( formArray: FormArray, index: number ): string | null {
    if( formArray.controls.length === 0 ) return null

    const errors = formArray.controls[index].errors ?? {}
    return this.getErrorMessage(errors);
  }

  static getErrorMessage( errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors[key].requiredLength} cáracteres`;
        case 'min':
          return `El valor mínimo es ${errors[key].min}`;
        case 'email':
          return 'El correo ingresado no es un correo electrónico válido';
        case 'pattern':
          if( errors['pattern'].requiredPattern === FormUtils.emailPattern ) {
            return 'El correo ingresado no es un correo electrónico válido';
          }
          if( errors['pattern'].requiredPattern === FormUtils.namePattern ) {
            return 'El nombre debe contener al menos un nombre y un apellido';
          }
          if( errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern ) {
            return 'El campo no puede contener espacios';
          }
          break
        case 'confirmPassword':
          return 'Las contraseñas no coinciden';
        default:
          return `Error desconocido: ${key}`;
      }
    }
    return null;
  }

  static isFieldOneEqualsFieldTwo( field1: string, field2: string ) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      if (field1Value === field2Value) {
        // Limpia el error si coincide
        formGroup.get(field2)?.setErrors(null);
        return null;
      } else {
        // Asigna el error al control confirmPassword
        formGroup.get(field2)?.setErrors({ confirmPassword: true });
        return { confirmPassword: true };
      }
    }
  }
}

