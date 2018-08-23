import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakecase'
})
export class SnakecasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let snakecase = null;

    if (value) {
     snakecase = value.trim();
      snakecase = snakecase.replace(/\s/g, '_');
    }

    return snakecase;
  }

}
