import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarUsers'
})
export class BuscarUsersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUsers = [];
    for (const users of value)
    {
    	if(users.email.toLowerCase().indexOf(arg.toLowerCase()) >-1)
    	{
    		resultUsers.push(users);
    	}
    }
   	return resultUsers;
  }

}
