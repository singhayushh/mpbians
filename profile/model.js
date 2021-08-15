const { Schema, model } = require("mongoose");

const profile = new Schema({
    school_id: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },
    stream: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    sex: {
        type: String,
        default: "Female",
    },
    picture: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
    location: {
        type: String,
        default: null,
    },
    about: {
        type: String,
        default: null,
    },
    designation: {
        type: String,
        default: null,
    },
    organization: {
        type: String,
        default: null,
    },
    field: {
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
    twitter: {
        type: String,
        default: null,
    },
    facebook: {
        type: String,
        default: null,
    },
    instagram: {
        type: String,
        default: null,
    },
    joined: {
        type: String,
        default: null,
    },
});

profile.index({
    name: 'text',
    email: 'text',
    phone: 'text',
    location: 'text',
    designation: 'text',
    organization: 'text',
    field: 'text',
});

let Profile = model("Profile", profile);
module.exports = Profile;
