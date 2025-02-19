import { Component, OnInit } from '@angular/core';
import { IDirector } from '../interfaces/idirector';
import { DadesDirectorsService } from '../services/dades-directors.service'

@Component({
  selector: 'app-director-list',
  standalone: false,
  templateUrl: './director-list.component.html',
  styleUrl: './director-list.component.css'
})
export class DirectorListComponent {
  constructor(private directorService: DadesDirectorsService) { }

  ngOnInit() {
    //fem servir event de creacio
    console.log("Listat d'directors inicialitzat");
    this.directorService.getDades().subscribe(resp => {
      // accedim al body de la resposta HTTP.
      if (resp.body) {
        this.directors = resp.body;
      }
    });
  }

  public deleteDirector(id: any) {
    this.directorService.deleteDirector(id).subscribe({
      next: (data: any) => {
        this.ngOnInit();
      },
    })
  }

  directors: IDirector[] = [];
  titolLlistat = 'DIRECTORS';
  listFilter = "";
}
