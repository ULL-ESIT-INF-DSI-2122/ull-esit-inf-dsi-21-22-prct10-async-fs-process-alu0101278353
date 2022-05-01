/**
 * Clase Note que representa una nota
 */
export declare class Note {
    private title;
    private bodyText;
    private color;
    /**
     * Constructor de la clase
     * @param title
     * @param bodyText
     * @param color
     */
    constructor(title: string, bodyText: string, color: string);
    /**
     * Getter pata 'title'
     * @returns el título de la nota
     */
    getTitle(): string;
    /**
     * Getter para 'bodyText'
     * @returns el contenido de la nota
     */
    getBodyText(): string;
    /**
     * Getter para 'color'
     * @returns el color de la nota
     */
    getColor(): string;
    /**
     * Setter para 'title'
     * @param newTitle nuevo titulo
     */
    setTitle(newTitle: string): void;
    /**
     * Setter para 'bodyText'
     * @param newBodyText nuevo contenido de la nota
     */
    setBodyText(newBodyText: string): void;
    /**
     * Setter para 'color'
     * @param newColor nuevo color para la nota
     */
    setColor(newColor: string): void;
    /**
     * Imprime la nota
     * @returns un string
     */
    printNote(): string;
}
