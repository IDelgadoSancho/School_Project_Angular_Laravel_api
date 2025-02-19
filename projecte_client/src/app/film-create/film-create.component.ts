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
  selectedFile: File | null = null;


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
      director_id: [null],
      image: [null]

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

    this.dadesFilmsService.createFilm(formData).pipe(
      catchError(error => {
        this.errorMessage = error.error.message;
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
