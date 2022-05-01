import {existsSync, readFile} from 'fs';
import {spawn} from 'child_process';
import * as yargs from 'yargs';


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
yargs.parse();
