import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messagedate',
  standalone: true
})
export class MessagedatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    console.log(value.toDate());
    let currentDate:Date = value.toDate()


    const day = currentDate.getDay();
    const month = currentDate.getMonth() + 1;  // Los meses empiezan desde 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`

    return formattedDate;
  } 
}
