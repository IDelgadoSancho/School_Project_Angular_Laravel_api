import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IDirector } from '../interfaces/idirector';
import { DadesDirectorsService } from '../services/dades-directors.service';
import { DadesShowsService } from '../services/dades-shows.service';

@Component({
  selector: 'app-show-edit',
  standalone: false,
  templateUrl: './show-edit.component.html',
  styleUrl: './show-edit.component.css'
})

export class ShowEditComponent {
  myForm: FormGroup;
  errorMessage = "";
  FilmService: any;
  directors: IDirector[] = [];
  selectedDirectors: number[] = [];
  id: string | null | undefined;


  constructor(
    private dadesShowsService: DadesShowsService,
    private router: Router, private formBuilder: FormBuilder,
    private dadesDirectorsService: DadesDirectorsService,
    private activatedRoute: ActivatedRoute) {
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

    // take the show and put the values in the form
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dadesShowsService.getShow(this.id).subscribe({
      next: (data: any) => {
        const show = data.body;
        this.myForm.patchValue({
          title: show.title,
          dataP: show.dataP,
          seasons: show.seasons,
          // fem el mateix per la resta de camps
        });
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });

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
    this.dadesShowsService.editShow(this.id, show).pipe(
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
