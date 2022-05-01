"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suma = void 0;
const fs_1 = require("fs");
/**
 * método que lee un fichero y suma la lista de némros que tiene.
 */
function suma() {
    (0, fs_1.readFile)('/home/usuario/p10/src/modi/numberList.txt', (err, data) => {
        if (err) {
            console.log('error al intentar leer el fichero');
        }
        else {
            let i = 0;
            let number = data.toString();
            for (let index = 0; index < number.length; index++) {
                i = parseInt(number[index]) + i;
            }
            console.log(`La suma es: ${i}`);
        }
    });
}
exports.suma = suma;
console.log(suma());
//# sourceMappingURL=suma.js.map