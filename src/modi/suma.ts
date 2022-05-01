import {readFile} from 'fs';
/**
 * método que lee un fichero y suma la lista de némros que tiene.
 */
export function suma() {
readFile('/home/usuario/p10/src/modi/numberList.txt', (err, data) => {
  if (err) {
    console.log('error al intentar leer el fichero');
  } else {
    let i: number = 0;
      let number = data.toString();
      for (let index = 0; index < number.length; index++) {
        i = parseInt(number[index]) + i;
      }
      console.log(`La suma es: ${i}`);
  }
});
}

console.log(suma());