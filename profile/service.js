const Profile = require("./model");

const Create = async (school_id, name, year) => {
    const newProfile = new Profile({ school_id, name, year });
    try {
        const profile = await newProfile.save();
        return { err: null, pid: profile._id };
    } catch (err) {
        return { err: err.message, pid: null };
    }
};

const Edit = async (school_id, data) => {
    try {
        const profile = await Profile.findOne({ school_id });
        const exists = await Profile.findOne({ email: data.email });
        if (exists && profile.email != exists.email) {
            return "This email already in use";
        }
        if (profile) {
            profile.stream = data.stream;
            profile.name = data.name;
            profile.email = data.email;
            profile.phone = data.phone;
            profile.sex = data.sex;
            profile.picture = data.picture;
            profile.bio = data.bio;
            profile.location = data.location;
            profile.about = data.about;
            profile.designation = data.designation;
            profile.organization = data.organization;
            profile.field = data.field;
            profile.website = data.website;
            profile.linkedin = data.linkedin;
            profile.instagram = data.instagram;
            profile.facebook = data.facebook;
            profile.twitter = data.twitter;
            await profile.save();
            return null;
        } else {
            return "Error finding the user";
        }
    } catch (err) {
        return err.message;
    }
};

const FetchProfile = async (school_id) => {
    const profile = await Profile.findOne({ school_id });
    if (!profile) {
        return { err: "Not found", profile: null };
    } else {
        return { err: null, profile: profile };
    }
};

module.exports = {
    Create,
    Edit,
    FetchProfile,
};
