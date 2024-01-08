import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder} from '@angular/forms';
import { Pet } from '../../model/Pet';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../service/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup-date',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './setup-date.component.html',
  styleUrl: './setup-date.component.css'
})
export class SetupDateComponent implements OnInit{
  pet: Pet;
  sendTextForm = this.formBuilder.group({
    name: ""
  });

  constructor(private formBuilder: UntypedFormBuilder, private activatedRoute: ActivatedRoute, private petService: PetService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.getPetByName(params["name"]))
  }

  getPetByName(name: string): void {
    this.petService.getPetByName(name).subscribe(foundPet => this.pet = foundPet);
  }
}
