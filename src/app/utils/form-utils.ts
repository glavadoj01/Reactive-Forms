import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

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

  private static getErrorMessage( errors: ValidationErrors): string | null {
      for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors[key].requiredLength} cáracteres`;
        case 'min':
          return `El valor mínimo es ${errors[key].min}`;
      }
    }
    return null;
  }
}

