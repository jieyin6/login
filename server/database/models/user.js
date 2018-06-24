const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserModel = new Schema({
    'user': {
        type: String,
        'require': true
    },
    'pwd': {
        type: String,
        'require': true
    },
    'type': {
        type: String,
        'require': true
    },
    'avatar': String,
    'position':String,
    'company':String,
    'request':String,
    'salary':String,
    'job':String,
    'mine':String
})

module.exports =  mongoose.model('user', UserModel)