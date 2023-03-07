import mongoose from 'mongoose';

const schema=mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name must be provided'],
        max: 16
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        max: 12
    }
},
    { timestamps: true }
);
schema.method('toJSON', function () {
    const { __v, _id, ...object }=this.toObject();

    return object;
});

export default mongoose.model("User", schema);