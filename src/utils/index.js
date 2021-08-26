// untuk pengaturan tanggal dll
const mapDBToModel = ({
    id,
    title,
    body,
    tags,
    created_at,
    update_at
}) => ({
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: update_at
});

module.exports = { mapDBToModel };