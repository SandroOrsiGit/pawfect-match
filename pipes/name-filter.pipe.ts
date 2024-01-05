import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from '../model/Pet';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(pets: Pet[] | null, name: string) {
    if(pets){
      return pets.filter((pet) => pet.name.toLocaleLowerCase().includes(name))
    }
    return;
  }

}
