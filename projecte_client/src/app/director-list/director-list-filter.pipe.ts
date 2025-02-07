import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'directorListFilter',
  standalone: false
})
export class DirectorListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
