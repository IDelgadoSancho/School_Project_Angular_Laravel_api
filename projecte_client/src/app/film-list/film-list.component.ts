import { Component, OnInit } from '@angular/core';
import { IFilm } from '../interfaces/ifilm';
import { DadesFilmsService } from '../services/dades-films.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-list',
  standalone: false,
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent {
  constructor(private filmService: DadesFilmsService, private router: Router) { }
  ngOnInit() {
    //fem servir event de creacio
    console.log("Listat de films inicialitzat");
    this.filmService.getDades().subscribe(resp => {
      // accedim al body de la resposta HTTP.
      if (resp.body) {
        this.films = resp.body;
      }
    });
  }

  films: IFilm[] = [];
  titolLlistat = 'Llistat de films';

  /**
     * eliminarfilm
     */
  public deleteFilm(id: any) {
    this.filmService.deleteFilm(id).subscribe({
      next: (data: any) => {
        this.ngOnInit();
      },
      error: (error: any) => {
        // this.errorMessage = error.message;
      }
    })
  }
}
