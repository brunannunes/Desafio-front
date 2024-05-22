import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  //um objeto behavior subject irá mudar de estado
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  //temos tambem um objeto que é observavel que notifica os outros que o seu valor mudou
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) {
   this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
    //results recebe data
    this.results = data.locations;
    this.filtredResults = data.locations;

   }

  //criando um metodo para poder pegar as unidades
  getAllUnits(): Observable<UnitsResponse>{
    return
  }
}
