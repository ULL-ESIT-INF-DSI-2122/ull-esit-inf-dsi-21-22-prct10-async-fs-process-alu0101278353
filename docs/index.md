# __Prática-10 Sistema de ficheros y creación de procesos en Node.js__


## Ejercicos desarrollados

- [Ejercicio 1](#item1)
- [Ejercicio 2](#item2)
- [Ejercicio 3](#item3)
- [Ejercicio 4](#item4)

<a name=item1></a>

### Ejercicio 1 - Traza de ejecución del código fuente en typescript

Código fuente que se analizará:
```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

La traza de ejecución de este código sería la siguiente:

- Como inicio de ejecución del programa se llama al primer condicional `if (process.argv.length !== 3)` esto es, que si los argumentos por línea de comandos son distinto de tres, retornará valor `true`, pero en nuestro caso, va retornar `false`, porque le estamos pasando exactamente los tres argumentos. Ya que la salida de esa sentencia es un `false`, ahora pasa a la pila la llamada a la función `access`, esta función comprueba los permisos del usuario al fichero o directorio que se le pasa como primer argumento. Esta función recibe tres parámetros, el primero es el fichero al que se quiere acceder, el segundo los permisos, y como tercer argumento un manejador con parámetro `err`, si se produce un error al acceder al fichero, imprimirá que el fichero no existe, ahora si no se produce un error entra a estar pendiente  de que se produzca cualquier envento de cambio en el fichero con el proceso hijo `watcher`, en esta situación la pila de llamadas sería la siguiente:
