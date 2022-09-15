import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yttRelativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: number): string {
    return this._toHoursAndMinutes(value);
  }

  private _toHoursAndMinutes(totalMinutes: number): string {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${this._padTo2Digits(hours)}:${this._padTo2Digits(minutes)} h`;
  }

  private _padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}