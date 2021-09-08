// mengimpor dotenv dan menjalankan konfogurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
// kita ganti dengan yg baru dikarenakan kita langsung menggunakan database tanpa memori note
//const NotesService = require('./services/inMemory/NotesService');
// notes
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require("./services/postgres/AuthenticationsService");
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    //host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
      {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      Plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator
      },
    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
