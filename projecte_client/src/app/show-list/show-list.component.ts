import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IShow } from '../interfaces/ishow';
import { IDirector } from '../interfaces/idirector';
import { DadesShowsService } from '../services/dades-shows.service';

@Component({
  selector: 'app-show-list',
  standalone: false,
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})

export class ShowListComponent {
  constructor(private showService: DadesShowsService, private router: Router) { }

  ngOnInit() {
    //fem servir event de creacio
    console.log("Listat de shows inicialitzat");
    this.showService.getDades().subscribe(resp => {
      // accedim al body de la resposta HTTP.
      if (resp.body) {
        this.shows = resp.body;
        // this.directors = this.extractDirectors(this.shows);
      }
    });
  }

  directors: IDirector[] = [];
  shows: IShow[] = [];
  titolLlistat = 'SHOWS';

  public extractDirectors(shows: IShow[]): IDirector[] {
    const directorsArray: IDirector[] = [];
    const directorIds = new Set<number>(); // Para evitar duplicados

    shows.forEach(show => {
      show.directors.forEach(director => {
        if (!directorIds.has(director.id)) {
          directorIds.add(director.id);
          directorsArray.push(director);
        }
      });
    });

    return directorsArray;
  }

  /**
     * eliminarfilm
     */
  public deleteShow(id: any) {
    this.showService.deleteShow(id).subscribe({
      next: (data: any) => {
        this.ngOnInit();
      },
      error: (error: any) => {
        // this.errorMessage = error.message;
      }
    })
  }
}
