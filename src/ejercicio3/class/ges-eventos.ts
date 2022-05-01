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