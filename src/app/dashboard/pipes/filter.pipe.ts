import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false,
  pure: false 
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText)
      );
    });
  }
}
