import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarRutas'
})
export class BuscarRutasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultRutas = [];
    for (const rutas of value)
    {
    	if(rutas.name.toLowerCase().indexOf(arg.toLowerCase()) >-1)
    	{
    		resultRutas.push(rutas);
    	}
    }
   	return resultRutas;
  }

}
