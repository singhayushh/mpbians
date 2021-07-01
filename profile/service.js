const Profile = require('./model');

const Create = async (school_id, year) => {
    const newProfile = new Profile({ school_id, year });
    try {
        const profile = await newProfile.save();
        return { 'err': null, 'pid': profile._id };
    } catch (err) {
        return { 'err': err.message, 'pid': null };
    }
};

const Edit = async (school_id, data) => {
    try {   
        const profile = await Profile.findOne({ school_id });
        profile.email = data.email;
        profile.phone = data.phone;
        profile.picture = data.picture;
        profile.stream = data.stream;
        profile.bio = data.bio;
        profile.description = data.description;
        profile.website = data.website;
        profile.linkedin = data.linkedin;
        await profile.save();
        return null;
    } catch (err) {
        return err.message;
    }
};

module.exports = {
    Create, Edit
};