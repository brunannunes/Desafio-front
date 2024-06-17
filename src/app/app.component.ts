import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import {FormsComponent} from './components/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CardListComponent } from './components/card-list/card-list.component';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, HeaderComponent, FormsComponent, HttpClientModule, CardListComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showList = new BehaviorSubject(false)
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService){}

  onSubmit(){
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}
