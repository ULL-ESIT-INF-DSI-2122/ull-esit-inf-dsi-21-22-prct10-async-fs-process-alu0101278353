import { Note } from './Note';
/**
 * Clase que representa a un Usuario
 */
export declare class User {
    private name;
    /**
     * atributo privado que contiene una lista de notas del usuario
     */
    private list;
    /**
     * Constructor de la clase
     * @param name Nombre del usuario
     */
    constructor(name: string);
    /**
     *
     * @param newName
     */
    setName(newName: string): void;
    /**
     * Getter para 'name'
     * @returns nombre del usuario
     */
    getName(): string;
    /**
     * Agrega una nota
     * @param note nota a agregar
     */
    setNote(note: Note): void;
    /**
     * Elimina una nota
     * @param titleNota titulo de la nota a eliminar
     */
    removeNote(titleNota: string): void;
    /**
     * Getter para 'list' de notas
     * @returns devuelve la lista de notas
     */
    getNotes(): Note[];
    /**
     * Busca la nota del usuario
     * @param title
     * @returns
     */
    searchNote(title: string): boolean;
    getTitleNote(): string;
}
