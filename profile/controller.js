const p = require("./service");

const Sample = async (_req, res) => {
    res.render("profile-sample");
};

const SampleEdit = async (_req, res) => {
    res.render("edit");
};

const Profile = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        const { err, profile } = await p.FetchProfile(school_id);
        if (!err)
            return res.render("profile", { user: profile, "auth": true });
        else
            return res.render('404');
    } catch (err) {
        res.render("500", { err });
    }
};

const RenderEdit = async (req, res) => {
    try {
        const message = req.query.message;
        const school_id = req.body.user.school_id;
        const { err, profile } = await p.FetchProfile(school_id);
        if (!err)
            res.render("edit", { "user": profile, "message": message });
        else 
            res.render("404");
    } catch (err) {
        res.render("500", { err });
    }
};

const Edit = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        if (req.body.sex == "Male") {
            req.body.picture = "/img/mark.png";
        } else {
            req.body.picture = "/img/grace.png";
        }
        const err = await p.Edit(school_id, req.body);
        if (!err) {
            res.redirect("/profile/me");
        } else {
            res.redirect(`/profile/edit?message=${err}`);
        }
    } catch (err) {
        res.render("500", { err });
    }
};

module.exports = {
    Sample,
    SampleEdit,
    Profile,
    Edit,
    RenderEdit,
};
