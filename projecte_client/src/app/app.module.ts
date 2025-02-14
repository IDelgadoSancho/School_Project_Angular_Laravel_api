import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';

/** directors */
import { DirectorListComponent } from './director-list/director-list.component';
import { DirectorEditComponent } from './director-edit/director-edit.component';
import { DirectorCreateComponent } from './director-create/director-create.component';
import { DirectorListFilterPipe } from './director-list/director-list-filter.pipe';

/** films */
import { FilmListComponent } from './film-list/film-list.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmEditComponent } from './film-edit/film-edit.component';

/** shows */
import { ShowListComponent } from './show-list/show-list.component';
// import { ShowCreateComponent } from './show-create/show-create.component';
// import { ShowEditComponent } from './show-edit/show-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    DirectorListComponent,
    DirectorEditComponent,
    DirectorCreateComponent,
    DirectorListFilterPipe,
    FilmListComponent,
    FilmCreateComponent,
    FilmEditComponent,
    ShowListComponent,
    // ShowCreateComponent,
    // ShowEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
