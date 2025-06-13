import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL_BASE = 'https://restcountries.com/v3.1'
  private http = inject(HttpClient);

  private _region: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ]

  // Así devuelvo una copia que se puede modificar,
  // Sí solo devuelvo this._region, se puede modificar directamente el campo privado
  get getRegion(): string[] {
    return [...this._region];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if ( !region || !this._region.includes(region) ) {
      return of([])
    }
    const url = `${this.URL_BASE}/region/${region}?fields=name,cca3,borders`
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    if ( !alphaCode ) {
      return of();
    }
    const url = `${this.URL_BASE}/alpha/${alphaCode}?fields=name,cca3,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBorderByCodes (bordes: string[]) {
    // WIP
  }
}
