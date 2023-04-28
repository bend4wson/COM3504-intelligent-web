// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
//
// const userSchema = new mongoose.Schema({
//     username: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
// });
//
// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }
//     next();
// });
//
// userSchema.methods.validatePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };
//
// const User = mongoose.model('User', userSchema);
//
// module.exports = User;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const Users = mongoose.model('User', UserSchema);
module.exports = Users;
