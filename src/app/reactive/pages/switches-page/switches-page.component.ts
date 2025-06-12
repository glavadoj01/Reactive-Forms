import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  })


  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
