const { Schema, model } = require('mongoose');

const profile = new Schema(
    {
        school_id: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
        },
        picture: {
            type: String,
            default: null,
        },
        year: {
            type: Number,
            required: true,
        },
        stream: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        website: {
            type: String,
            default: null,
        },
        linkedin: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
        },
    }
);

let Profile = model('Profile', profile);
module.exports = Profile;