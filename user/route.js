const express = require('express');
const Router = express();
const u = require('./controller');
const auth = require('../support/auth');

Router.get('/change-password', auth(), u.RenderChange);
Router.get('/reset-password/:token', auth(), u.RenderReset);

Router.post('/login', u.Login);
Router.post('/new', u.Verify);
Router.post('/register', u.Register);
Router.post('/create-one', auth('admin'), u.CreateOne);
Router.post('/change-password', auth(), u.ChangePassword);
Router.post('/forgot-password', u.ForgotPassword);


module.exports = Router;