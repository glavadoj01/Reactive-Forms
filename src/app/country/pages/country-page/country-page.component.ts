import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder)
  countryService = inject(CountryService)

  regions = signal(this.countryService.getRegion)

  countriesByRegion = signal<Country[]>([])
  borders = signal<Country[]>([])

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  onFormChange = effect( (onCleanup) => {
    const regionSubscription = this.onRegionChange()
    const countrySubscription = this.onCountryChange()

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  })

  onRegionChange() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        //Limpiamos los valores de los campos country y border
        // y los valores de las señales
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.myForm.get('border')!.setValue('') ),
        tap( () => {
          this.countriesByRegion.set([])
          this.borders.set([])
        }),
        filter( region => region!.length > 0 ),
        switchMap( region => this.countryService.getCountriesByRegion(region ?? '') ),
      )
      .subscribe( countries => {
        this.countriesByRegion.set(countries)
      }
    )
  }

  onCountryChange() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('border')!.setValue('') ),
        tap( () => this.borders.set([]) ),
        filter( value => value!.length > 0 ),
        switchMap( countryCode => this.countryService.getCountryByAlphaCode(countryCode ?? '') ),
        switchMap( country => this.countryService.getCountryNamesByBorderCodes(country.borders) ),
      )
      .subscribe( border => {
        this.borders.set(border)
      }
    )
  }
}
