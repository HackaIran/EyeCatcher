const db = require('./db');

const userSchema = db.Schema({
    email: String,
    city: String
});

const User = db.model('User', userSchema);

module.exports = User;