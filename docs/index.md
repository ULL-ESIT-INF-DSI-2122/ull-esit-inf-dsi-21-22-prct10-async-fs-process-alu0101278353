# __Prática-10 Sistema de ficheros y creación de procesos en Node.js__


## Ejercicos desarrollados

- [Ejercicio 1](#item1)
- [Ejercicio 2](#item2)
- [Ejercicio 3](#item3)

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

- Como inicio de ejecución del programa se llama al primer condicional `if (process.argv.length !== 3)` esto es, que si los argumentos por línea de comandos son distinto de tres, retornará valor `true`, pero en nuestro caso, va retornar `false`, porque le estamos pasando exactamente los tres argumentos. Ya que la salida de esa sentencia es un `false`, ahora pasa a la pila la llamada a la función `access`, esta función comprueba los permisos del usuario al fichero o directorio que se le pasa como primer argumento. Esta función recibe tres parámetros, el primero es el fichero al que se quiere acceder, el segundo los permisos, y como tercer argumento un manejador con parámetro `err`, si se produce un error al acceder al fichero imprimirá que el fichero no existe, ahora si no se produce un error entra a estar pendiente  de que se produzca cualquier envento de cambio en el fichero con el proceso hijo `watcher`, en esta situación la pila de llamadas sería la siguiente:




<a name=item2></a>

### Ejercicio 2 

__Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.__

Para el desarrollo de este ejercicio se ha utilizado del paquete `yargs` para la gestión de línea de comandos, este recibe dos argumentos, `word` que será la palabra a ser buscada y `file` que es el fichero al que se accederá al contenido para expandir con el comando `cat`, redirigiendo la salida de este al comando `grep` para obtener las líneas en las que se encuentra la palabra buscada.
A Continuación 

```ts
/**
 * Haciendo uso del método pipe
 * ```console
 * node dist/childProccess.js pipe file="prueba.txt" word="hola"
 * ```
 */
 yargs.command({
  command: 'pipe',
  describe: 'Using method "pipe" of a stream',
  builder: {
    file: {
      describe: 'Name of the file to read',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Word to search',
      demandOption: true,
      type: 'string',
    },
  },
  ```

  Ahora aqui se hace la comprobación de los argumentos, primero se comprueba que sean de tipo `string`, después comprobamos que el fichero de texto exista, si es así pasa a leer el contenido con `readFile`. Si no hay ningún error al leer el contenido pasamos a crear el proceso hijo con `spawn` de la siguiente manera: `const cat = spawn('cat', [pathFile]);` que recibe el comando **cat** y el  fichero que se ha pasado por parámetros, despues creamos el otro processo hijo grep con spwan de la siguiente manera: `const grep = spawn('grep', [word]);`, este recibe la palabra aser buscada en el fichero.
  De esta manera redirigimos la salida del comando cat como entrada al comando grep haciendo el uso `pipe`:

```ts
  cat.stdout.pipe(grep.stdin);
  grep.stdout.on('data', (dat)=> {
    let dataString: string = dat.toString();
    // Resultado de GREP
    console.log('RESULTADO DEL "CHILDPROCCESS" GREP');
    process.stdout.write(dat);
    // Conteo de palabras repetidas
    let array1 = dataString.split(/[\s\.,]+/gi);
    console.log('IDICES IGUALES SON PALABRAS QUE SE REPITEN');
    array1.forEach((word) => {
      let sal = dataString.match(word);
      console.log(`La palabra "${word}" tiene el index "${sal?.index}"`);
    });
});
```
Como se puede ver para el conteo de palabras repetidas, hago el uso de la expresión regular `/[\s\.,]+/gi` donde elimina los espacios en blancos y caracter, con los flags **gi**, se tendría un resultado asi: `['carla', 'vive', 'en','tenrife']`, y con el método watch llamandado al `dataString`(Salida del comando grep), para buscar la palabra en esa cadena. De esta manera devuelve un índice de coincidencia.
La salida sería la siguiente:
```console

``` 
**CÓDIGO COMPLETO**
```ts
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.word === 'string') {
      let pathFile = `${argv.file}`;
      let word: string = argv.word;
      if (!existsSync(pathFile)) {
        console.log(`El fichero ${argv.file} no existe`);
      } else {
        readFile(pathFile, (err) => {
          if (err) {
            console.log('Hay un problema al leer el fichero');
          } else {
            const cat = spawn('cat', [pathFile]);
            const grep = spawn('grep', [word]);
            // redirijo la salida a grep
            cat.stdout.pipe(grep.stdin);
            grep.stdout.on('data', (dat)=> {
              let dataString: string = dat.toString();
              // Resultado de GREP
              console.log('RESULTADO DEL "CHILDPROCCESS" GREP');
              process.stdout.write(dat);
              // Conteo de palabras repetidas
              let array1 = dataString.split(/[\s\.,]+/gi);
              console.log('IDICES IGUALES SON PALABRAS QUE SE REPITEN');
              array1.forEach((word) => {
                let sal = dataString.match(word);
                console.log(`La palabra "${word}" tiene el index "${sal?.index}"`);
              });
            });
          }
        });
      }
    }
  },
});
```

<a name=item3></a>

### Ejercicio 3

Para el desarrollo de este ejercicio se ha realizado lo siguiente y se ejcuta de la siguiente manera:

```console
$node dist/ejercicio3/class/note-app.js change --user="carla" --dir="/home/usuario/p10/src/ejercicio3/Notes/carla"
```

Donde `--user` es el usurio de la aplicación de notas y `--dir` es el directorio del usuario al que se estará observando los cambios producidos en el.

Pero primero responderemos a las preguntas realizadas en el enunciado:
¿Qué evento emite el objeto Watcher cuando se crea un nuevo fichero en el directorio observado? 
Emite dos eventos, `change` y `rename` 
¿Y cuando se elimina un fichero existente?
Este emite un evento `rename` 
¿Y cuando se modifica?
Emite un evento de tipo `change`

Para monitorear los cambios y tipos de eventos, para cuando se produce un evento `change` llama a la función `eventChange(`${pathFile}${argv.user}/`, `${file}`);`. Esta tiene el siguiente contenido:

```ts
import * as fs from 'fs';
/**
 * Función que gestiona el evento "change"
 * @param dir directorio del usuario
 * @param file nota que será agregada o modificada
 */
export function eventChange(dir: string, file: string) {
  fs.watchFile(`${dir}${file}`, (curr, prev) => {
    if (curr.size === prev.size) {
      console.log(`El fichero ${file} ha sido creado`);
    } else if (curr.size >= prev.size) {
      console.log(`El fichero ${file} ha sido modificado`);
    } else if (curr.size === 0) {
      console.log(`El fichero ${file} ha sido eliminado`);
    }
  });
}

```

```ts
/**
 * Controlará los cambios realizados en el fichero
 */
 yargs.command({
  command: 'change',
  describe: 'Whatch changes in the file',
  builder: {
    user: {
      describe: 'Name User',
      demandOption: true,
      type: 'string',
    },
    dir: {
      describe: 'User notes directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.dir === 'string') {
      if (fs.existsSync(`${pathFile}${argv.user}`)) {
        // const files = fs.readdirSync(`${pathFile}${argv.user}`); // directorio de usuario
        watch(`${pathFile}${argv.user}`, (eventType, file) => {
          console.log(`Cambio en el directorio ../Notes/${argv.user}`);
          console.log(`Tipo de evento: ${eventType}`);
          if (eventType === 'rename') {
            if (!fs.existsSync(`${pathFile}${argv.user}/${file}`)) {
              console.log(`El fichero ${file} ha sido eliminado`);
              }
          } else {
              eventChange(`${pathFile}${argv.user}/`, `${file}`);
          }
        });
      } else {
        console.log('El directorio no exise');
      }
    }
  },
});
```