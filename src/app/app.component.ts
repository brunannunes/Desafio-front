import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import {FormsComponent} from './components/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, HeaderComponent, FormsComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showList = new BehaviorSubject(false)

  onSubmit(){
    console.log("chegou no app")
  }
}
