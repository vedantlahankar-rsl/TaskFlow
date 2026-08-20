import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent], // <-- Removed RouterOutlet
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { // <-- Renamed from AppComponent to App
  title = 'Taskflow';
}