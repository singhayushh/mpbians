const { Schema, model } = require('mongoose');
const { hash } = require('bcrypt');

const user = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        school_id: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            default: null,
        },
        registered: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: 'Student',
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        },
        token: {
            type: String,
            default: null
        }
    }, 
    {
        timestamps: true,
    }
);

user.pre('save', async function (next) {
    if (!this.isModified || !this.isNew) {
        next();
    } else this.isModified('password');
    if (this.password)
        this.password = await hash(String(this.password), 12);
    next(); 
});

let User = model('User', user);
module.exports = User;