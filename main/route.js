const express = require('express');
const Router = express();
const m = require('./controller');
const auth = require('../support/auth');

Router.get('/', m.Home);
Router.get('/login', auth('block'), m.Login);
Router.get('/register', auth('block'), m.Register);

Router.get('/:school_id', m.User)
Router.get('/batch/:year', auth(), m.Batch);

module.exports = Router;