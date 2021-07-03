const { FetchByUsername, FetchByYear, FetchYearStats } = require("../user/service");
const { FetchProfile } = require("../profile/service");

const Home = (req, res) => {
    res.render("home", { auth: req.body.role });
};

const Login = (req, res) => {
    const message = req.query.message;
    res.render("login", { message, auth: req.body.role });
};

const Register = (req, res) => {
    const message = req.query.message;
    res.render("register", { message, auth: req.body.role });
};

const User = async (req, res) => {
    const { school_id } = req.params;
    const { err, profile } = await FetchProfile(school_id);
    if (!err)
        res.render("profile", {
            user: profile,
            self: false,
            auth: req.body.role,
        });
    else res.render("404", { auth: req.body.role });
};

const Contact = async (req, res) => {
    const message = req.query.message;
    res.render("contact", { message, auth: req.body.role });
};

const Dashboard = async (req, res) => {
    const stats = await FetchYearStats();
    res.render("dashboard", { "stats": stats, "auth": req.body.role });
};

const Batch = async (req, res) => {
    const { year } = req.params;
    const users = await FetchByYear(year);
    res.render("batch", { users, auth: req.body.role });
};

module.exports = {
    Home,
    Login,
    User,
    Batch,
    Register,
    Contact,
    Dashboard,
};
