import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value == null) {
      return ' '
    } else {
      return value.split(' ').map(n => n[0]).join('');
    }
    
  }

}

