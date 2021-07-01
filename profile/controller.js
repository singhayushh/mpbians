const p = require('./service');

const Profile = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        const profile = await p.FetchProfile(school_id);
        res.render('user', { profile });
    } catch (err) {
        res.render('500', err);
    }
};

const RenderEdit = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        const profile = await p.FetchProfile(school_id);
        res.render('edit', { profile });
    } catch (err) {
        res.render('500', err);
    }
};

const Edit = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        const data = {
            email: req.body.email,
            phone: req.body.phone,
            picture: req.body.picture,
            stream: req.body.stream,
            bio: req.body.bio,
            description: req.body.description,
            website: req.body.website,
            linkedin: req.body.linkedin,
        };
        const err = await p.Edit(school_id, data);
        if (!err) {
            res.redirect('/profile');
        } else {
            res.redirect(`/profile/edit?err=${err}`);
        }
    } catch (err) {
        res.render('500', err);
    }
};

module.exports = {
    Profile, Edit, RenderEdit
};