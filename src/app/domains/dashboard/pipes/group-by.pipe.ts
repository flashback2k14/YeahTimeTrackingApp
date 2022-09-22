import { Pipe, PipeTransform } from '@angular/core';
import { TimeTrackingActionExtended } from '@shared/modules';

@Pipe({
  name: 'yttGroupBy',
  standalone: true,
})
export class GroupByPipe implements PipeTransform {
  transform(
    map: Map<string, TimeTrackingActionExtended>,
    property: keyof TimeTrackingActionExtended
  ): Map<string, TimeTrackingActionExtended[]> {
    if (!map || map.size <= 0) {
      return new Map<string, TimeTrackingActionExtended[]>();
    }

    const values = [...map.values()].reduce(
      (
        previous: Map<string, TimeTrackingActionExtended[]>,
        current: TimeTrackingActionExtended
      ) => {
        if (previous.has(current[property])) {
          previous.get(current[property])!.push(current);
        } else {
          previous.set(current[property], [current]);
        }

        return previous;
      },
      new Map<string, TimeTrackingActionExtended[]>()
    );

    console.log(values);

    return values;
  }
}