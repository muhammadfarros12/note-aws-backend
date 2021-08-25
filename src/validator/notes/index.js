const InvarianError = require("../../exceptions/InvarianError");
const { NotePayloadSchema } = require("./schema");

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);
        if(validationResult.error) {
            // diubah juga
            //throw new Error(validationResult.error.message);
            throw new InvarianError(validationResult.error.message);
        }
    },
};

module.exports = NotesValidator;