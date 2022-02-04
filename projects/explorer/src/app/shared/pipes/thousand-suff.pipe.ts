import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuff'
})
export class ThousandSuffixesPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    let exp;
    const suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];
    if (Number.isNaN(input)) {
      return null;
    }
    if (input < 1000) {
      return input;
    }
    exp = Math.floor(Math.log(input) / Math.log(1000));
    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
