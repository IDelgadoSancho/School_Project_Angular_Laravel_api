import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

/** directors */
import { DirectorListComponent } from './director-list/director-list.component';
import { DirectorEditComponent } from './director-edit/director-edit.component';
import { DirectorCreateComponent } from './director-create/director-create.component';

/** films */
import { FilmListComponent } from './film-list/film-list.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmEditComponent } from './film-edit/film-edit.component';

/** shows */


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },

  { path: 'director-list', component: DirectorListComponent },
  { path: 'director-create', component: DirectorCreateComponent },
  { path: 'director-edit/:id', component: DirectorEditComponent },


  { path: 'film-create', component: FilmCreateComponent },
  { path: 'film-list', component: FilmListComponent },
  { path: 'film-edit/:id', component: FilmEditComponent },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
