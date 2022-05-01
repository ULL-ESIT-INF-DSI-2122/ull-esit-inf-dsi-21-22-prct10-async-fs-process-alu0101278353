"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yargs = require("yargs");
const User_1 = require("./User");
const Note_1 = require("./Note");
const chalk = require("chalk");
const fs_1 = require("fs");
const ges_eventos_1 = require("./ges-eventos");
// import { spawn } from 'child_process';
/**
 * Path para guardar las notas
 */
const pathFile = '/home/usuario/p10/src/ejercicio3/Notes/';
/**
 * lista de usuarios
 */
let users = [];
/**
 * Lee los usuarios y sus notas para crear la lista de usuarios
 */
const setUsers = () => {
    const file = fs.readdirSync(pathFile);
    file.map((user) => {
        const newUser = new User_1.User(user);
        const notes = fs.readdirSync(pathFile + user);
        notes.map((note) => {
            // console.log(note);
            const newNote = fs.readFileSync(pathFile + user + '/' + note, { encoding: 'utf8', flag: 'r' });
            newUser.setNote(JSON.parse(newNote));
        });
        users = [...users, newUser];
        // console.log(users);
    });
};
/**
 * Agrega una nota
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body from the note',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color from the note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.title === 'string' && typeof argv.user === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            const note = new Note_1.Note(argv.title, argv.body, argv.color);
            const newUsu = new User_1.User(argv.user);
            let dir = `${pathFile}${argv.user}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
                newUsu.setNote(note);
                users = [...users, newUsu];
                console.log('Nota agregada');
            }
            else {
                if (!fs.existsSync(`${dir}/${argv.title}.json`)) {
                    fs.writeFileSync(`${dir}/${argv.title}.json`, JSON.stringify(note, null, 2));
                    newUsu.setNote(note);
                    console.log('Nota agregada');
                }
                else {
                    console.log('Tienes una nota con ese nombre');
                }
            }
        }
    },
});
// /**
//  * Elimina nota de la lista
//  */
yargs.command({
    command: 'remove',
    describe: 'Delete a note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.title === 'string' && typeof argv.user === 'string') {
            let thisUser = users.find((user) => user.getName() === argv.user);
            let title = argv.title;
            if (!users.find((user) => user.getName() === argv.user)) {
                let dir = `${pathFile}${argv.user}`;
                if (fs.existsSync(`${dir}/${argv.title}.json`)) {
                    fs.unlinkSync(`${dir}/${argv.title}.json`);
                    if (thisUser !== undefined) {
                        if (thisUser.searchNote(title)) {
                            thisUser.removeNote(title);
                        }
                        console.log('nota eliminada');
                    }
                }
                else {
                    console.log('Nombre de nota incorrecto');
                }
            }
            else {
                console.log('nombre de usuario incorrecto');
            }
        }
    },
});
/**
 * Lista las nota que tiene el usuario
 */
yargs.command({
    command: 'list',
    describe: 'List a note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            setUsers();
            let notes = [];
            if (users.find((user) => user.getName() === argv.user)) {
                let thisUser = users.find((user) => user.getName() === argv.user);
                if (thisUser !== undefined) {
                    notes = thisUser.getNotes();
                    notes.forEach((note) => {
                        let values = Object.values(note).at(0);
                        console.log(values);
                    });
                }
            }
            else {
                console.log('nombre de usuario incorrecto');
            }
        }
    },
});
/**
 * Lee el contenido de la nota del usuario
 */
yargs.command({
    command: 'read',
    describe: 'Read the content of the note',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            setUsers();
            if (users.find((user) => user.getName() === argv.user)) {
                if (fs.existsSync(`${pathFile}${argv.user}/${argv.title}.json`)) {
                    let thisUser = users.find((user) => user.getName() === argv.user);
                    if (thisUser !== undefined) {
                        const note = fs.readFileSync(`${pathFile}${argv.user}/${argv.title}.json`, { encoding: 'utf8', flag: 'r' });
                        const objecNote = JSON.parse(note);
                        console.log(`Contenido: ${objecNote.bodyText}\nColor: ${(objecNote.color === 'green') ? chalk.green(objecNote.color) : chalk.red(objecNote.color)}`);
                    }
                }
                else {
                    console.log('La nota no existe o ha escrito mal el nombre');
                }
            }
            else {
                console.log('nombre de usuario incorrecto');
            }
        }
    },
});
/**
 * Controlará los cambios realizados en el fichero
 */
yargs.command({
    command: 'change',
    describe: 'Whatch changes in the file',
    builder: {
        user: {
            describe: 'Name User',
            demandOption: true,
            type: 'string',
        },
        dir: {
            describe: 'User notes directory',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.dir === 'string') {
            if (fs.existsSync(`${pathFile}${argv.user}`)) {
                // const files = fs.readdirSync(`${pathFile}${argv.user}`); // directorio de usuario
                (0, fs_1.watch)(`${pathFile}${argv.user}`, (eventType, file) => {
                    // const fileOrigin = `${pathFile}${argv.user}/${file}`;
                    console.log(`Cambio en el directorio ../Notes/${argv.user}`);
                    console.log(`Tipo de evento: ${eventType}`);
                    if (eventType === 'rename') {
                        if (!fs.existsSync(`${pathFile}${argv.user}/${file}`)) {
                            console.log(`El fichero ${file} ha sido eliminado`);
                            // eventChange(`${pathFile}${argv.user}/`, `${file}`);
                            // const cat = spawn('cat', ['-n', `${pathFile}${argv.user}/${file}`]);
                            // cat.stdout.pipe(process.stdout);
                        }
                    }
                    else {
                        (0, ges_eventos_1.eventChange)(`${pathFile}${argv.user}/`, `${file}`);
                    }
                });
            }
            else {
                console.log('El directorio no exise');
            }
        }
    },
});
yargs.parse();
//# sourceMappingURL=note-app.js.map