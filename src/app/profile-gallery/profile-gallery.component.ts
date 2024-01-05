import { Component, OnInit } from '@angular/core';
import { PetService } from '../service/pet.service';
import { Pet } from '../../../model/Pet';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from '../../../pipes/name-filter.pipe';
import { filter } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, NameFilterPipe, ReactiveFormsModule],
  templateUrl: './profile-gallery.component.html',
  styleUrl: './profile-gallery.component.css'
})
export class ProfileGalleryComponent implements OnInit{
  searchText: string = "";
  pets$: Observable<Pet[]>
  selectedPet: Pet;
  constructor(private petService: PetService){
  }

  ngOnInit(): void {
    this.pets$ = this.getPets();
  }

  getPets(): Observable<Pet[]>{
    return this.petService.getPets().pipe(
      filter(pets => pets !== null)
    );
  }

  get pets(): Observable<Pet[]>{
    return this.pets$;
  }

  selectPet(pet: Pet){
    this.selectedPet = pet;
  }
}
