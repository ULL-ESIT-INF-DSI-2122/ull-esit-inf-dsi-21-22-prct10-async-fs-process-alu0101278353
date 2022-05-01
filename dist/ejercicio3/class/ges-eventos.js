"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventChange = void 0;
const fs = require("fs");
/**
 * Función que gestiona el evento "change"
 * @param dir directorio del usuario
 * @param file nota que será agregada o modificada
 */
function eventChange(dir, file) {
    fs.watchFile(`${dir}${file}`, (curr, prev) => {
        if (curr.size === prev.size) {
            console.log(`El fichero ${file} ha sido creado`);
        }
        else if (curr.size >= prev.size) {
            console.log(`El fichero ${file} ha sido modificado`);
        }
        else if (curr.size === 0) {
            console.log(`El fichero ${file} ha sido eliminado`);
        }
    });
}
exports.eventChange = eventChange;
//# sourceMappingURL=ges-eventos.js.map