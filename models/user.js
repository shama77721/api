const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login:    {type: String, required: true, unique: true},
    password: { type: String, required: true},
    height: {type: String, required:false, default: ""},
    weight:{type: String,required:false, default: ""},
    age: {type: String,required:false, default: ""},
    gender: {type:String,required:false , default: ""},
    trainingGoal: {type: String, required:false,default: "0"},
    role: {type: String, required: true, default: 1}
});

module.exports = mongoose.model('User', userSchema);