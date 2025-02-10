import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'WELCOME TO THE FILMOTECA!';
  nom = 'Ismael';
  cognoms = 'Delgado';
  retornarNomCognoms(){
    return this.nom + ' ' + this.cognoms;
  }
}
