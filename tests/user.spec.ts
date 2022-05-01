import 'mocha';
import {expect} from 'chai';
import {User} from '../src/ejercicio3/class/User';
import {Note} from '../src/ejercicio3/class/Note';


describe('add function tests', () => {
  const elvis = new User('elvis');
  // const fer = new User('fer');
  const nota1 = new Note('Tema1', 'Funciones', 'red');
  const nota2 = new Note('Tema2', 'Interfaces', 'green');
  it('name User', () => {
    expect(elvis.getName()).to.be.equal('elvis');
  });
  it('Nuevo nombre a "elvis"', () => {
    elvis.setName('Elvis');
    expect(elvis.getName()).to.be.equal('Elvis');
  });
  it('Agrega una nota al usuario "elvis"', () => {
    elvis.setNote(nota1);
    elvis.setNote(nota2);
    expect(elvis.getNotes()).to.be.eql([nota1, nota2]);
  });
  it('Elimina una nota al usuario "elvis"', () => {
    elvis.removeNote(nota1.getTitle());
    expect(elvis.getNotes()).to.be.eql([nota2]);
  });
  it('Notas del usuario "elvis"', () => {
    expect(elvis.getNotes()).to.be.eql([nota2]);
  });
  it('El usuario "elvis" no tiene la nota="Tema1"', () => {
    expect(elvis.searchNote(nota1.getTitle())).to.be.equal(false);
  });
  it('El usuario "elvis" tiene la nota="Tema2"', () => {
    expect(elvis.searchNote(nota2.getTitle())).to.be.equal(true);
  });
});