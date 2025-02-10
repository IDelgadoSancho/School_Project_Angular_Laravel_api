import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DadesFilmsService } from '../services/dades-films.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { IDirector } from '../interfaces/idirector';
import { DadesDirectorsService } from '../services/dades-directors.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-film-create',
  standalone: false,
  templateUrl: './film-create.component.html',
  styleUrl: './film-create.component.css'
})
export class FilmCreateComponent {
  myForm: FormGroup;
  errorMessage = "";
  FilmService: any;
  directors: IDirector[] = [];

  constructor(private dadesFilmsService: DadesFilmsService, private router: Router, private formBuilder: FormBuilder, private dadesDirectorsService: DadesDirectorsService) {
    this.myForm = new FormGroup({})
  }
  ngOnInit(): void {
    this.dadesDirectorsService.getDades().subscribe({
      next: (response: HttpResponse<IDirector[]>) => {
        this.directors = response.body || [];
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    })
    this.myForm = this.formBuilder.group({
      title: [null],
      dataP: [null],
      duration: [null],
      director_id: [null]
    });
  }

  /**
   * onSubmit
   */
  public onSubmit(llibre: any) {
    this.dadesFilmsService.createFilm(llibre).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          // Navigate to the absolute path
          this.router.navigateByUrl('/film-list');
        }
      }
    });
  }
}
