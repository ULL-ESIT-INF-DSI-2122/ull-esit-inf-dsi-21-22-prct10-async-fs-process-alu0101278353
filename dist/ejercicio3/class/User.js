"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Clase que representa a un Usuario
 */
class User {
    /**
     * Constructor de la clase
     * @param name Nombre del usuario
     */
    constructor(name) {
        this.name = name;
        this.list = [];
    }
    /**
     *
     * @param newName
     */
    setName(newName) {
        this.name = newName;
    }
    /**
     * Getter para 'name'
     * @returns nombre del usuario
     */
    getName() {
        return this.name;
    }
    /**
     * Agrega una nota
     * @param note nota a agregar
     */
    setNote(note) {
        this.list = [...this.list, note];
    }
    /**
     * Elimina una nota
     * @param titleNota titulo de la nota a eliminar
     */
    removeNote(titleNota) {
        this.list = this.list.filter((n) => n.getTitle() !== titleNota);
    }
    /**
     * Getter para 'list' de notas
     * @returns devuelve la lista de notas
     */
    getNotes() {
        return this.list;
    }
    /**
     * Busca la nota del usuario
     * @param title
     * @returns
     */
    searchNote(title) {
        let value = true;
        if (this.list.find((n) => n.getTitle() === title)) {
            value;
        }
        else {
            value = false;
        }
        return value;
    }
    getTitleNote() {
        let out = '';
        this.list.forEach((note) => {
            out = `${note.getTitle()}\n`;
        });
        return out;
    }
}
exports.User = User;
// let users: User[] = [];
// let user = new User('elvis');
// let user2 = new User('fer');
// let nota1 = new Note('puchi', 'asdhflña0', 'lsls');
// let nota2= new Note('cora', 'asdhflña0', 'lsls');
// user.setNote(nota1);
// user.setNote(nota2);
// user2.setNote(nota1);
// user.removeNote('puchi');
// users.push(user);
// users.push(user2);
// console.log( user instanceof User);
//# sourceMappingURL=User.js.map