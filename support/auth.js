const jwt = require("jsonwebtoken");

const auth = (passer) => {
    return async (req, res, next) => {
        try {
            // Decode the jwt if present
            const decoded = jwt.verify(
                req.cookies["auth_token"],
                process.env.jwt_secret
            );

            if (!decoded.user) {
                req.body.role = "Guest";
                if (passer == "allow" || passer == "guest") {
                    next();
                } else {
                    res.redirect("/login?message=Login in to view the page");
                }
            } else {
                // Add user to request body
                req.body.user = decoded.user;

                // Only guests can view this page
                if (passer == "guest") {
                    return res.redirect("/profile/me");
                }

                if (passer == "admin") {
                    if (decoded.user.role == "Admin") {
                        next();
                    } else {
                        res.redirect("/profile/me?message=unauthorized");
                    }
                } else {
                    next();
                }
            }
        } catch (error) {
            req.body.role = "Guest";
            if (passer == "allow" || passer == "guest") next();
            else res.redirect("/login?message=Login in to view the page");
        }
    };
};

module.exports = auth;
