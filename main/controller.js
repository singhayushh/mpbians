const { FetchByUsername, FetchYearStats } = require("../user/service");
const { FetchProfile, FetchByYear } = require("../profile/service");

const Home = (req, res) => {
    res.render("home", { auth: req.body.role });
};

const Csv = (req, res) => {
    res.render("csv", { auth: req.body.role });
};

const Search = (req, res) => {
    res.render("search", { auth: req.body.role, search_text: '', 'results': [] });
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
    const { csv, stats } = await FetchYearStats();
    let admin = false;
    if (req.body.user && req.body.user.role == "Admin") admin = true;
    res.render("dashboard", {
        stats: stats,
        csv: csv,
        auth: req.body.role,
        admin: admin,
    });
};

const Batch = async (req, res) => {
    const { year } = req.params;
    const { total, registered, unregistered } = await FetchByYear(year);
    res.render("batch", {
        total,
        registered,
        unregistered,
        year,
        auth: req.body.role,
    });
};

module.exports = {
    Home,
    Csv,
    Login,
    User,
    Search,
    Batch,
    Register,
    Contact,
    Dashboard,
};
