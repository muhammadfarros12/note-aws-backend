const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,// hanya menerima dan menyimpan satu note
        //authentication strategy
        options: {
            auth: 'notesapp_jwt',
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,// mengembalikan banyak note
        //authentication strategy
        options: {
            auth: 'notesapp_jwt',
        }
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,// hanya mengambil satu nilai note
        //authentication strategy
        options: {
            auth: 'notesapp_jwt',
        }
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler, // hanya mengambil dan mengubah satu note
        //authentication strategy
        options: {
            auth: 'notesapp_jwt',
        }
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
        //authentication strategy
        options: {
            auth: 'notesapp_jwt',
        }
    },
];

module.exports = routes;
