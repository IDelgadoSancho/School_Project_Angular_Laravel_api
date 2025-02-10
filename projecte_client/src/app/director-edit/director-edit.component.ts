import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { DadesDirectorsService } from '../services/dades-directors.service';


@Component({
  selector: 'app-director-edit',
  standalone: false,
  templateUrl: './director-edit.component.html',
  styleUrl: './director-edit.component.css'
})
export class DirectorEditComponent {
  id: string | null | undefined;
  myForm: FormGroup;
  errorMessage = "";
  selectedFile: File | null = null;

  constructor(
    private router: Router, private formBuilder: FormBuilder,
    private dadesDirectorService: DadesDirectorsService,
    private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dadesDirectorService.getDirector(this.id).subscribe({
      next: (data: any) => {
        const director = data.body;
        this.myForm.setValue({
          name: director.name,
          surname: director.surname,
          image: director.image,
          // fem el mateix per la resta de camps
        });
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });

    this.myForm = this.formBuilder.group({
      name: [null],
      surname: [null],
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
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('surname', this.myForm.get('surname')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.dadesDirectorService.editDirector(this.id, formData).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigateByUrl('/director-list');
        }
      }
    });
  }
}
