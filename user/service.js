const User = require("./model");
const bcrypt = require("bcrypt");

const Create = async (name, school_id, pid) => {
    const newUser = new User({
        name: name,
        school_id: school_id,
        profile: pid,
    });
    if (school_id == process.env.admin_id) newUser.role = "Admin";
    await newUser.save();
    return;
};

const Login = async (school_id, password) => {
    const user = await User.findOne({ school_id, registered: true });
    if (!user) {
        return { err: "Incorrect User ID or Password", user: null };
    }

    if (await bcrypt.compare(password, user.password)) {
        return { err: null, user: user };
    } else {
        return { err: "Incorrect User ID or Password", user: null };
    }
};

const Verify = async (school_id, name) => {
    const user = await User.findOne({ school_id, name });
    if (user) {
        if (user.registered) {
            return {
                err: "This account has already been registered to the platform",
                id: null,
            };
        }
        return { err: null, id: user._id };
    } else {
        return { err: "Invalid User ID or Name", id: null };
    }
};

const Register = async (_id, newPassword) => {
    password = await bcrypt.hash(String(newPassword), 12);
    const user = await User.findOne({ _id });
    if (user && !user.registered) {
        user.password = password;
        user.registered = true;
        await user.save();
        return { err: null, user: user };
    } else {
        return {
            err: "Account already registered or does not exist",
            user: null,
        };
    }
};

const EditToken = async (school_id, token) => {
    const user = await User.findOne({ school_id });

    if (!user) {
        return "Invalid UID";
    }

    if (user.registered) {
        user.token = token;
        await user.save();
        return null;
    } else {
        return "Your account has not been registered yet";
    }
};

const SetPassword = async (school_id, token, password) => {
    password = await bcrypt.hash(String(newPassword), 12);
    if (school_id) {
        try {
            await await User.updateOne({ school_id }, { password });
            return null;
        } catch (err) {
            return err.message;
        }
    } else if (token) {
        try {
            await await User.updateOne({ token }, { password });
            return null;
        } catch (err) {
            return err.message;
        }
    } else {
        return "invalid token";
    }
};

const FetchByToken = async (token) => {
    return await User.findOne({ token }).populate({ path: "profile" });
};

const FetchByUsername = async (school_id) => {
    return await User.findOne({ school_id }).populate({ path: "profile" });
};

const FetchByYear = async (year) => {
    return await User.find({ year }).populate({ path: "profile" });
};

module.exports = {
    Create,
    Login,
    Verify,
    Register,
    EditToken,
    SetPassword,
    FetchByToken,
    FetchByUsername,
    FetchByYear,
};
