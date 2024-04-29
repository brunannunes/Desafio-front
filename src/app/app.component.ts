import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import {FormsComponent} from './components/forms/forms.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, HeaderComponent, FormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'desafio-SmartFit';
}
