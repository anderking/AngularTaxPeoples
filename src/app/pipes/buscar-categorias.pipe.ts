import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCategorias'
})
export class BuscarCategoriasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCategorias = [];
    for (const categorias of value)
    {
    	if(categorias.name.toLowerCase().indexOf(arg.toLowerCase()) >-1)
    	{
    		resultCategorias.push(categorias);
    	}
    }
   	return resultCategorias;
  }

}
