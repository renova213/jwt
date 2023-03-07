import mongoose from 'mongoose';

const schema=mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name must be provided'],
        maxLength: 255
    },
    email: {
        type: String,
        maxLength: 255
    },
    phone: {
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

export default mongoose.model("User", schema);