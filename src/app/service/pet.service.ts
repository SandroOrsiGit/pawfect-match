import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { Pet } from '../model/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `${environment.backendUrl}/pets`;
   }

   getPets(): Observable<Pet[]> {
      return this.http.get<Pet[]>(this._url).pipe(map(pets => pets.sort(this.sortByName)))
   }

   getPetByName(name: string): Observable<Pet> {
    return this.http.get<Pet>(`${environment.backendUrl}/pets/${name}`)
   }

   addPet(pet: Pet): Observable<Pet> {
      return this.http.post<Pet>(this._url, pet)
   }

   sortByName(pet1: Pet, pet2: Pet){
     if(pet1.name < pet2.name) return -1;
     if(pet1.name > pet2.name) return 1;
     return 0;
   }
}
