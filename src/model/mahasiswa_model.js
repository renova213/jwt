import mongoose from 'mongoose';

const schema=mongoose.Schema({
    nama_lengkap: {
        type: String,
        required: [true, 'Name must be provided'],
        maxLength: 255
    },
    jenis_kelamin: {
        type: String,
        required: [true, 'Gender price must be provided'],
        maxLength: 255
    },
    tanggal_lahir: {
        type: String,
        required: [true, 'Datebirth must be provided'],
        maxLength: 255
    },
    tempat_lahir: {
        type: String,
        required: [true, 'Datebirth must be provided'],
        maxLength: 255
    },
    alamat: {
        type: String,
        required: [true, 'Address must be provided'],
        maxLength: 255
    },
},
    { timestamps: true }
);
schema.method('toJSON', function () {
    const { __v, _id, ...object }=this.toObject();
    object.id=_id;

    return object;
});

export default mongoose.model("mahasiswa", schema);