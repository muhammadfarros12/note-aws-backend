const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,// hanya menerima dan menyimpan satu note
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,// mengembalikan banyak note
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,// hanya mengambil satu nilai note
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler, // hanya mengambil dan mengubah satu note
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
    },
];

module.exports = routes;
