import mongoose from 'mongoose';

const schema=mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name must be provided'],
        maxLength: 16,
        minLength: 6
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        maxLength: 100,
        minLength: 8
    },
    role: {
        type: String,
        maxLength: 255
    },

},
    { timestamps: true }
);
schema.method('toJSON', function () {
    const { __v, _id, ...object }=this.toObject();

    return object;
});

export default mongoose.model("auth", schema);