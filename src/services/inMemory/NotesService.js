const { nanoid } = require('nanoid');
const InvarianError = require('../../exceptions/InvarianError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({title,body, tags}){
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
    };

        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if(!isSuccess) {
            //setelah penambahan berkas exceptions untuk menspesifikkan error(antara kesalahan client ataupun karena server)  
            //throw new Error('Catatan Gagal dtambahkan');
            throw new InvarianError('Catatan Gagal dtambahkan');
        }

        return id;
    }

    getNotes(){
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];

        if(!note){
            // sama juga
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return note;
    }

    // sebelumnya error di postman dikarenakan di dalam variabel update newDate bukan (new Date)
    editNoteById(id, {title, body, tags}) {
        const index = this._notes.findIndex((note) => note.id === id);

        if(index === -1) {
            //diganti juga
            //throw new error('Gagal memperbarui catatan. Id tidak ditemukan');
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);

        if(index === -1) {
            // juga
            //throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }

        this._notes.splice(index, 1);
    }

}

module.exports = NotesService;
