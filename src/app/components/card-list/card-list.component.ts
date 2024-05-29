import { Component } from '@angular/core';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  unitsList: Location[] = [];


  constructor(private unitService: GetUnitsService){

  }

  ngOnInit(): void{
    this.unitsList = this.unitService.getFilteredUnits();
    console.log(this.unitsList);
  }

}
