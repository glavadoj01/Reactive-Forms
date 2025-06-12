import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

const erroresBasicos = [Validators.required, Validators.minLength(3)]

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtil = FormUtils

  newFavoriteControl = new FormControl('', erroresBasicos);

  myForm: FormGroup = this.fb.group({
    name: ['', erroresBasicos],
    favoriteGames: this.fb.array([
      this.fb.control('Metal Gear Solid', erroresBasicos),
      this.fb.control('The Legend of Zelda', erroresBasicos)
    ], Validators.minLength(2))
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addFavorite() {
    if (this.newFavoriteControl.valid) {
      const newGame = this.newFavoriteControl.value;

      this.favoriteGames.push(this.fb.control(newGame, erroresBasicos));
      this.newFavoriteControl.reset();
    }
  }

  removeFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
