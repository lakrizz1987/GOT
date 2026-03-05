import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: false
})
export class JoinPipe implements PipeTransform {
  transform(value: string[], separator: string = ', '): string {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.filter(item => item && item.trim() !== '').join(separator);
  }
}