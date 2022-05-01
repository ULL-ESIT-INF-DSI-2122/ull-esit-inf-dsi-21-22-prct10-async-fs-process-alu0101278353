"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
/**
 * Clase Note que representa una nota
 */
class Note {
    /**
     * Constructor de la clase
     * @param title
     * @param bodyText
     * @param color
     */
    constructor(title, bodyText, color) {
        this.title = title;
        this.bodyText = bodyText;
        this.color = color;
    }
    /**
     * Getter pata 'title'
     * @returns el título de la nota
     */
    getTitle() {
        return this.title;
    }
    /**
     * Getter para 'bodyText'
     * @returns el contenido de la nota
     */
    getBodyText() {
        return this.bodyText;
    }
    /**
     * Getter para 'color'
     * @returns el color de la nota
     */
    getColor() {
        return this.color;
    }
    /**
     * Setter para 'title'
     * @param newTitle nuevo titulo
     */
    setTitle(newTitle) {
        this.title = newTitle;
    }
    /**
     * Setter para 'bodyText'
     * @param newBodyText nuevo contenido de la nota
     */
    setBodyText(newBodyText) {
        this.bodyText = newBodyText;
    }
    /**
     * Setter para 'color'
     * @param newColor nuevo color para la nota
     */
    setColor(newColor) {
        this.color = newColor;
    }
    /**
     * Imprime la nota
     * @returns un string
     */
    printNote() {
        const out = `Titulo: ${this.title}, Contenido:${this.bodyText}, Color:${this.color}`;
        return out;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map