"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const yargs = require("yargs");
/**
 * Haciendo uso del método pipe
 * ```console
 * node dist/cat.js pipe file="prueba.txt" word="hola"
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
            let word = argv.word;
            if (!(0, fs_1.existsSync)(pathFile)) {
                console.log(`El fichero ${argv.file} no existe`);
            }
            else {
                (0, fs_1.readFile)(pathFile, (err) => {
                    if (err) {
                        console.log('Hay un problema al leer el fichero');
                    }
                    else {
                        const cat = (0, child_process_1.spawn)('cat', [pathFile]);
                        const grep = (0, child_process_1.spawn)('grep', [word]);
                        // redirijo la salida a grep
                        cat.stdout.pipe(grep.stdin);
                        grep.stdout.on('data', (dat) => {
                            let dataString = dat.toString();
                            // Resultado de GREP
                            console.log('RESULTADO DEL CHILDPROCCESS GREP');
                            process.stdout.write(dat);
                            // Conteo de palabras repetidas
                            let array1 = dataString.split(/[\s\.,]+/gi);
                            console.log('Inidices iguales son palabras que se repiten');
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
//# sourceMappingURL=cat.js.map