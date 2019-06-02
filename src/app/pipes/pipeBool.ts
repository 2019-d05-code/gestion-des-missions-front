import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class PipeBool implements PipeTransform {

  transform(value: boolean, args?: any): any {
    return value == true ? 'Oui' : 'Non';
  }

}
