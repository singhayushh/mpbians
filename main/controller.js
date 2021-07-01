const { FetchByUsername, FetchByYear } = require('../user/service');

const Home = (_req, res) => {
    res.render('home');
};

const Login = (_req, res) => {
    res.render('login');
};

const Register = (_req, res) => {
    res.render('register');
};

const User = async (req, res) => {
    const { school_id } = req.params;
    const user = await FetchByUsername(school_id);
    if (user)
    res.render('user', { user });
    else 
    res.render('404');
};

const Batch = async (req, res) => {
    const { year } = req.params;
    const users = await FetchByYear(year);
    res.render('batch', { users });
};

module.exports = {
    Home, Login, Register, User, Batch
};