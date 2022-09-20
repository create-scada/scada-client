import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundString'
})
export class RoundStringPipe implements PipeTransform {

  transform(value: string):any {
    let result = Number(value);
    if (isNaN(result)) {
      return value;
    }
    else {
      return result.toFixed(2);
    }
}

}
