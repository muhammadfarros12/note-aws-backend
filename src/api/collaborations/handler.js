class CollaborationsHandler {
    constructor(collaborationsService, notesService, validator) {
        this._collaborationsService = collaborationsService;
        this._notesService = notesService;
        this._validator = validator;

        this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
        this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);

    }

    async postCollaborationHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);
            const { id: creadentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;

            await this._notesService.verifyNoteOwner(noteId, creadentialId);

            const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

            const response = h.response({
                status: 'success',
                message: 'Kolaborasi berhasil ditambahkan',
                data: {
                    collaborationId,
                },
            });
            return response.code(201);

        } catch (error) {
            if (error instanceof ClientError) {
                const response = ({
                    status: 'fail',
                    message: error.message
                });

                return response.code(error.statusCode);
            }

            // jika server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalam pada server kami.'
            });

            response.code(500);
            console.error(error);
            return response;

        }
    }

    async deleteCollaborationHandler(request, h){
        try {
            this._validator.validateCollaborationPayload(request.payload);
            const { id: creadentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;

            await this._notesService.verifyNoteOwner(noteId, creadentialId);
            await this._collaborationsService.deleteCollaboration(noteId, userId);

            const response = h.response({
                status: 'success',
                message: 'Kolaborasi berhasil dihapus',
            });
            return response.code(201);

        } catch (error) {
            if (error instanceof ClientError) {
                const response = ({
                    status: 'fail',
                    message: error.message
                });

                return response.code(error.statusCode);
            }

            // jika server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalam pada server kami.'
            });

            response.code(500);
            console.error(error);
            return response;

        }
    }
}

module.exports = CollaborationsHandler;