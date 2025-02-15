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
import { ShowListComponent } from './show-list/show-list.component';
import { ShowCreateComponent } from './show-create/show-create.component';
import { ShowEditComponent } from './show-edit/show-edit.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },

  { path: 'director-list', component: DirectorListComponent },
  { path: 'director-create', component: DirectorCreateComponent },
  { path: 'director-edit/:id', component: DirectorEditComponent },

  { path: 'film-list', component: FilmListComponent },
  { path: 'film-create', component: FilmCreateComponent },
  { path: 'film-edit/:id', component: FilmEditComponent },

  { path: 'show-list', component: ShowListComponent },
  { path: 'show-create', component: ShowCreateComponent },
  { path: 'show-edit/:id', component: ShowEditComponent },


  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
