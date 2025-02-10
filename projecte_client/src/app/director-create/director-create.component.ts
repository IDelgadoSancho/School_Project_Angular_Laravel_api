import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DadesDirectorsService } from '../services/dades-directors.service';
import { log } from 'node:console';

@Component({
  selector: 'app-director-create',
  standalone: false,
  templateUrl: './director-create.component.html',
  styleUrl: './director-create.component.css'
})
export class DirectorCreateComponent {
  myForm: FormGroup;
  errorMessage = "";
  directorService: any;
  selectedFile: File | null = null;


  constructor(private dadesDirectorService: DadesDirectorsService, private router: Router, private formBuilder: FormBuilder) {
    this.myForm = new FormGroup({})
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: [null],
      surname: [null],
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
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('surname', this.myForm.get('surname')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.dadesDirectorService.createDirector(formData).pipe(
      catchError(error => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigateByUrl('/autor-list');
        }
      }   
    });
  }
}
