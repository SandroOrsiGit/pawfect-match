import { Component, OnInit } from '@angular/core';
import { PetService } from '../service/pet.service';
import { Pet } from '../model/Pet';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from '../pipes/name-filter.pipe';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormControl, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, NameFilterPipe, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-gallery.component.html',
  styleUrl: './profile-gallery.component.css'
})
export class ProfileGalleryComponent implements OnInit{
  searchText: string = "";
  pets$: Observable<Pet[]>
  selectedPet: Pet;
  createPetForm = this.formbuilder.group({
    id: 0,
    name: "",
    kind: "",
    image: "",
    profileText: "",
    popularity: 0
  });

  constructor(private petService: PetService, private formbuilder: UntypedFormBuilder){
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

  onSubmit() {
    console.log(this.createPetForm)
    this.petService.addPet(this.createPetForm.value).subscribe(_ => this.pets$ = this.getPets())
    
  }
}
