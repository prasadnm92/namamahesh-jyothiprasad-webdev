/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var facebookConfig = {
        clientID     : "1812306868982232",
        clientSecret : "30cb22d7d4705d27b95d8367b83a9d98",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };

    app.use(session({
        secret: 'this is a secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/login", passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', {
        scope : ['profile', 'email'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/#/user',failureRedirect: '/#/login'}));
    app.post("/api/checkLoggedIn", checkLoggedIn);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        console.dir(profile);
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model
                            .userModel
                            .createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        res.send(req.user);
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(!user) return done(null, false);
                    return done(null, user);
                },
                function(error) {
                    return done(error);
                }
            );
    }

    function serializeUser(user, done) {
        //put user into the current session
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error);
                }
            )
    }

    function checkLoggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user: undefined);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.sendStatus(400).send(err);
                        } else {
                            res.send(user);
                        }
                    });
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        if(req.query.username) {
            if(req.query.password) findUserByCredentials(req, res);
            else findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .findUserById(uid)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function(status) {
                    //status: {"ok":1,"nModified":1,"n":1}
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};