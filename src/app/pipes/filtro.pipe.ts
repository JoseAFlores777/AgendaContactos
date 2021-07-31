import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string = ''): any[] {
    if (texto === '') {
      return arreglo;
    }
    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();
    return arreglo.filter(
      item => item.firstName.toLowerCase().includes(texto)
    );
  }

}
