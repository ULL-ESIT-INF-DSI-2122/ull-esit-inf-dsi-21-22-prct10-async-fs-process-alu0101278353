"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const child_process_1 = require("child_process");
// const pathFile = '/home/usuario/p10/src/modi/numberList.txt';
if (process.argv.length !== 3) {
    console.log('Please, specify a file');
}
else {
    if (!(0, fs_1.existsSync)(process.argv[2])) {
        console.log('el fichero no existe');
    }
    else {
        const filename = process.argv[2];
        const watcher = (0, fs_1.watch)(filename, () => {
            const fun = (0, child_process_1.spawn)('node', ['dist/modi/suma.js']);
            fun.stdout.pipe(process.stdout);
        });
        watcher.on('change', () => {
            console.log('Cambio en el ficero');
        });
    }
}
//# sourceMappingURL=watchfile.js.map