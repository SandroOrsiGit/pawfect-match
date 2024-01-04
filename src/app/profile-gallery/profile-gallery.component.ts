import { Component, OnInit } from '@angular/core';
import { PetService } from '../service/pet.service';
import { Pet } from '../../../model/Pet';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-gallery.component.html',
  styleUrl: './profile-gallery.component.css'
})
export class ProfileGalleryComponent implements OnInit{
  pets$: Observable<Pet[]>
  selectedPet: Pet | undefined;
  constructor(private petService: PetService){
    this.pets$ = EMPTY;
  }

  ngOnInit(): void {
    this.pets$ = this.getPets();
  }

  getPets(): Observable<Pet[]>{
    return this.petService.getPets();
  }

  get pets(): Observable<Pet[]>{
    return this.pets$;
  }

  selectPet(pet: Pet){
    this.selectedPet = pet;
  }
}
