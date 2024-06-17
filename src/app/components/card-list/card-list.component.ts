import { Component, Input } from '@angular/core';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  @Input() unitsList: Location[] = [];


  constructor(){

  }

  ngOnInit(): void{
    console.log(this.unitsList)
  }

}
