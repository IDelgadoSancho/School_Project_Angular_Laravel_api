import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IDirector } from '../interfaces/idirector';
import { DadesDirectorsService } from '../services/dades-directors.service';
import { DadesShowsService } from '../services/dades-shows.service';

@Component({
  selector: 'app-show-create',
  standalone: false,
  templateUrl: './show-create.component.html',
  styleUrl: './show-create.component.css'
})
export class ShowCreateComponent {
  myForm: FormGroup;
  errorMessage = "";
  FilmService: any;
  directors: IDirector[] = [];
  selectedDirectors: number[] = [];

  constructor(
    private dadesShowsService: DadesShowsService,
    private router: Router, private formBuilder: FormBuilder,
    private dadesDirectorsService: DadesDirectorsService) {
    this.myForm = new FormGroup({})
  }
  ngOnInit(): void {

    // Take all directors
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
      seasons: [null],
      directors: [null]
    });
  }

  /**
   * onDirectorChange
   */
  public onDirectorChange(dir_id: number, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedDirectors.push(dir_id);
    } else {
      this.selectedDirectors = this.selectedDirectors.filter(id => id !== dir_id);
    }
    this.myForm.get('directors')?.setValue(this.selectedDirectors);
  }

  /**
   * onSubmit
   */
  public onSubmit(show: any) {
    this.dadesShowsService.createShow(show).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          // Navigate to the absolute path
          this.router.navigateByUrl('/show-list');
        }
      }
    });
  }
}
