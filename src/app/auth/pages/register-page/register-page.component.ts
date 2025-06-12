import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  },{
    validators: [
      FormUtils.isFieldOneEqualsFieldTwo('password', 'confirmPassword')
    ]
  })

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
