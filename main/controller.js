const { FetchByUsername, FetchByYear } = require("../user/service");
const { FetchProfile } = require("../profile/service");

const Home = (_req, res) => {
    res.render("home");
};

const Login = (req, res) => {
    const message = req.query.message;
    res.render("login", { message });
};

const Register = (req, res) => {
    const message = req.query.message;
    res.render("register", { message });
};

const User = async (req, res) => {
    const { school_id } = req.params;
    const { err, profile } = await FetchProfile(school_id);
    if (profile) res.render("profile", { "user": profile, "auth": false });
    else res.render("404");
};

const Batch = async (req, res) => {
    const { year } = req.params;
    const users = await FetchByYear(year);
    res.render("batch", { users });
};

module.exports = {
    Home,
    Login,
    Register,
    User,
    Batch,
};
