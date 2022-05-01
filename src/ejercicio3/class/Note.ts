/**
 * Clase Note que representa una nota
 */
export class Note {
  /**
   * Constructor de la clase
   * @param title 
   * @param bodyText 
   * @param color 
   */
  constructor(private title: string, private bodyText: string, private color: string) {
  }
  /**
   * Getter pata 'title'
   * @returns el título de la nota
   */
  public getTitle(): string {
    return this.title;
  }
  /**
   * Getter para 'bodyText'
   * @returns el contenido de la nota
   */
  getBodyText(): string {
    return this.bodyText;
  }
  /**
   * Getter para 'color'
   * @returns el color de la nota
   */
  getColor(): string {
    return this.color;
  }
  /**
   * Setter para 'title'
   * @param newTitle nuevo titulo
   */
  setTitle(newTitle: string): void {
    this.title = newTitle;
  }
  /**
   * Setter para 'bodyText'
   * @param newBodyText nuevo contenido de la nota
   */
  setBodyText(newBodyText: string): void {
    this.bodyText = newBodyText;
  }
  /**
   * Setter para 'color'
   * @param newColor nuevo color para la nota
   */
  setColor(newColor: string): void {
    this.color = newColor;
  }
  /**
   * Imprime la nota
   * @returns un string
   */
  public printNote(): string {
    const out: string = `Titulo: ${this.title}, Contenido:${this.bodyText}, Color:${this.color}`;
    return out;
  }
}

