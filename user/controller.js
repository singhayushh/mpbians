const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const u = require('./service');
const p = require('../profile/service');

const ForgotPassword = async (req, res) => {
    try {
        const { school_id } = req.body;
        const token = mongoose.Types.ObjectId();
        const err = await u.EditToken(school_id, token);
        if (!err) {
            // Send Mail
            res.redirect('/login?message=success');
        } else {
            res.redirect(`/login?err=${err}`)
        }
    } catch (err) {
        res.render('500', { err });
    }
};

const ChangePassword = async (req, res) => {
    try {
        const { user, password } = req.body;
        const err = await u.SetPassword(user.school_id, null, password);
        if (!err) {
            res.redirect('/?message=success');
        }
    } catch (err) {
        res.render('500', err);
    }
};

const ResetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const err = await u.SetPassword(null, token, password);
        if (!err) {
            res.redirect('/?message=success');
        }
    } catch (err) {
        res.render('500', err);
    }
};

const Login = async (req, res) => {
    try {
        const { school_id, password } = req.body;
        const { err, user } = await u.Login(school_id, password);
        if (!err) {        
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
            });
            res.redirect(`/${school_id}`);
        } else {
            res.redirect(`/login?message=${err}`);
        }
    } catch (err) {
        res.render('500', err);
    }
};

const Register = async (req, res) => {
    try {
        const { school_id, password } = req.body;
        const { err, user } = await u.Register(school_id, password);
        if (!err) {        
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
            });
            res.render('edit', { user });
        } else {
            res.redirect(`/register?err=${err}`);
        }
    } catch (err) {
        res.render('500', err);
    }
};

const Verify = async (req, res) => {
    try {
        const { school_id, name } = req.body;
        const message = await u.Verify(school_id, name);
        if (message != "success") {
            res.redirect(`/register?message=${message}`)
        } else {
            res.render('change', { action: "Create a password"});
        }
    } catch (err) {
        res.render('500', err);
    }
};

const CreateOne = async (req, res) => {
    try {
        const { name, year, school_id } = req.body;
        const { err, pid } = await p.Create(school_id, year);
        if (err) {
            res.render('500', err);
        } else {
            await u.Create(name, school_id, pid);
            res.redirect(`/batch/${year}`);
        }
    } catch (err) {
        res.render('500', err);
    }
};

const CreateMany = async (req, res) => {

};

const RenderChange = (req, res) => {
    const user = req.body.user;
    res.render('change', { user });
};

const RenderReset = async (req, res) => {
    const { token } = req.params;
    const user = await u.FetchByToken(token);
    if (!user) {
        res.render('404');
    }
    res.render('reset', { token, name: user.name });
};

module.exports = {
    ForgotPassword,
    ChangePassword,
    ResetPassword,
    Verify,
    Login,
    Register,
    CreateOne,
    RenderChange,
    RenderReset
};