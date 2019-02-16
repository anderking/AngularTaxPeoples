import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPublicaciones'
})
export class BuscarPublicacionesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
