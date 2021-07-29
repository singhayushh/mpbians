const p = require("./service");

const Sample = async (_req, res) => {
    res.render("profile-sample", { auth: req.body.role });
};

const Profile = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;
        const { err, profile } = await p.FetchProfile(school_id);
        if (!err)
            return res.render("profile", {
                user: profile,
                self: true,
                auth: req.body.role,
            });
        else return res.render("404", { auth: req.body.role });
    } catch (err) {
        res.render("500", { err, auth: req.body.role });
    }
};

const RenderEdit = async (req, res) => {
    try {
        const message = req.query.message;
        const school_id = req.body.user.school_id;
        const { err, profile } = await p.FetchProfile(school_id);
        if (!err)
            res.render("edit", { user: profile, message, auth: req.body.role });
        else res.render("404", { auth: req.body.role });
    } catch (err) {
        res.render("500", { err, auth: req.body.role });
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
        res.render("500", { err, auth: req.body.role });
    }
};

const EditPicture = async (req, res) => {
    try {
        const school_id = req.body.user.school_id;

        const picture = req.file.path;

        const err = await p.EditPicture(school_id, { picture });
        if (!err) {
            res.redirect("/profile/me");
        } else {
            res.redirect(`/profile/edit?message=${err}`);
        }
    } catch (err) {
        res.render("500", { err, auth: req.body.role });
    }
};

module.exports = {
    Sample,
    Profile,
    Edit,
    EditPicture,
    RenderEdit,
};
