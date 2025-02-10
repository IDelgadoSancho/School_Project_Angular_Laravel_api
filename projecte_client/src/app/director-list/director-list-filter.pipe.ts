import { Pipe, PipeTransform } from '@angular/core';
import { IDirector } from '../interfaces/idirector';

@Pipe({
  name: 'directorListFilter',
  standalone: false,
})
export class DirectorListFilterPipe implements PipeTransform {

  transform(directors: IDirector[], filterBy: string): IDirector[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? directors.filter((director) => {
      return director.name.toLowerCase().indexOf(filterBy) !== -1 || director.surname.toLowerCase().indexOf(filterBy) !== -1;
    }) : directors;
  }

}
