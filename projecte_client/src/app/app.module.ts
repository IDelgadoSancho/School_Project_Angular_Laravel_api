import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from "@angular/forms";
/** directors */
import { DirectorListComponent } from './director-list/director-list.component';
import { DirectorEditComponent } from './director-edit/director-edit.component';
import { DirectorCreateComponent } from './director-create/director-create.component';

/** films */
import { FilmListComponent } from './film-list/film-list.component';
import { FilmCreateComponent } from './film-create/film-create.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { DirectorListFilterPipe } from './director-list/director-list-filter.pipe';

/** shows */


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DirectorListComponent,
    WelcomeComponent,
    FilmListComponent,
    FilmCreateComponent,
    DirectorCreateComponent,
    FilmEditComponent,
    DirectorEditComponent,
    DirectorListFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DirectorListFilterPipe,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
