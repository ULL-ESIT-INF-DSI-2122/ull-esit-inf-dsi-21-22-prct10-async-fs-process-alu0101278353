import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/ejercicio3/class/Note';


describe('add function tests', () => {
  const nota1 = new Note('Tema1', 'Funciones', 'red');
  const nota2 = new Note('Tema2', 'Interfaces', 'green');
  it('Titulo de la nota="nota1"', () => {
    expect(nota1.getTitle()).to.be.equal('Tema1');
  });
  it('Nuevo titulo para la "nota2"', () => {
    nota2.setTitle('Tema 2-Creación de Proyecto en TypeScript');
    expect(nota2.getTitle()).to.be.equal('Tema 2-Creación de Proyecto en TypeScript');
  });
  it('Contenido de la nota 1', () => {
    expect(nota1.getBodyText()).to.be.equal('Funciones');
  });
  it('Nuevo Contenido para la nota 1', () => {
    nota2.setBodyText('Interfaces Genéricas');
    expect(nota2.getBodyText()).to.be.equal('Interfaces Genéricas');
  });
  it('Color de la nota="nota1" igual red', () => {
    expect(nota1.getColor()).to.be.equal('red');
  });
  it('Nuevo color de la nota="nota2" a blue ', () => {
    nota2.setColor('blue');
    expect(nota2.getColor()).to.be.equal('blue');
  });
  it('print nota1', () => {
    expect(nota1.printNote()).to.be.equal('Titulo: Tema1, Contenido:Funciones, Color:red');
  });
});