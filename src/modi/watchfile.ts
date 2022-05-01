import {existsSync, watch} from 'fs';
import {spawn} from 'child_process';
// const pathFile = '/home/usuario/p10/src/modi/numberList.txt';
if (process.argv.length !== 3) {
    console.log('Please, specify a file');
  } else {
    if (!existsSync(process.argv[2])) {
      console.log('el fichero no existe');
    } else {
      const filename = process.argv[2];
      const watcher = watch(filename, ()=> {
        const fun = spawn('node', ['dist/modi/suma.js']);
        fun.stdout.pipe(process.stdout);
      });

      watcher.on('change', () => {
        console.log('Cambio en el ficero');
      });
    }
}