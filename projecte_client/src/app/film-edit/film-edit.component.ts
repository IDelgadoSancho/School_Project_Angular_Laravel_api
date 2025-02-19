import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IDirector } from '../interfaces/idirector';
import { DadesFilmsService } from '../services/dades-films.service';
import { DadesDirectorsService } from '../services/dades-directors.service';
import { title } from 'process';

@Component({
  selector: 'app-film-edit',
  standalone: false,
  templateUrl: './film-edit.component.html',
  styleUrl: './film-edit.component.css'
})
export class FilmEditComponent {
  id: string | null | undefined;
  myForm: FormGroup;
  errorMessage = "";
  directors: IDirector[] = [];
  selectedFile: File | null = null;


  constructor(
    private dadesFilmsService: DadesFilmsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dadesDirectorsService: DadesDirectorsService,
    private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dadesFilmsService.getFilm(this.id).subscribe({
      next: (data: any) => {
        const film = data.body;
        this.myForm.patchValue({
          title: film.title,
          dataP: film.dataP,
          duration: film.duration,
          director_id: film.director_id,
          image: film.image,
          // fem el mateix per la resta de camps
        });
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });

    this.dadesDirectorsService.getDades().subscribe({
      next: (response: HttpResponse<IDirector[]>) => {
        this.directors = response.body || [];
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })

    this.myForm = this.formBuilder.group({
      title: [null],
      dataP: [null],
      duration: [null],
      director_id: [null],
      image: [null],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    console.log(file);
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    const formData = new FormData();
    formData.append('title', this.myForm.get('title')?.value);
    formData.append('dataP', this.myForm.get('dataP')?.value);
    formData.append('duration', this.myForm.get('duration')?.value);
    formData.append('director_id', this.myForm.get('director_id')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.dadesFilmsService.editFilm(this.id, formData).pipe(
      catchError(error => {
        this.errorMessage = error.error.message;
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigateByUrl('/film-list');
        }
      }
    });
  }
}
