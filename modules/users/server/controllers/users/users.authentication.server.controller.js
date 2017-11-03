'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    UsedPromoCode = mongoose.model('UsedPromoCode'),
    Facebook = require('facebook-node-sdk'),
    helper = require('../../../../helper/helper');

// URLs for which user can't be redirected on signin
var noReturnUrls = ['/authentication/signin', '/authentication/signup'];

/**
 * Signup
 */
exports.signup = function (req, res) {
    // For security measurement we remove the roles from the req.body object  delete
    // req.body.roles; Init user and add missing fields
    var user = new User(req.body);
    user.provider = 'local';
    if (user.roles) {
        user.roles = user.roles;
    } else {
        user.roles = ['user'];
    }
    user.token_id = helper.token();
    user.displayName = user.firstName + ' ' + user.lastName;

    // Then save the user
    user.save(function (err) {
        if (err) {
            return res
                .status(422)
                .send({
                    message: errorHandler.getErrorMessage(err)
                });
        } else {

            req
                .login(user, function (err) {
                    if (err) {
                        res
                            .status(400)
                            .send(err);
                    } else {
                        res.json(user);
                    }
                });
        }
    });
};

/**
 * Signin after passport authentication
 */
exports.signin = function (req, res, next) {
    var data = req.body;
    if (data['IsSocailLogin']) {
        User
            .findOne({
                social_id: data.id
            }, function (err, user) {
                if (err) {
                    res
                        .status(400)
                        .send(err);
                } else if (!user) {
                    var token = helper.token();
                    var obj = {
                        social_id: data.id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        phone: data.phone,
                        password: "localdata.id" + data.displayName + data.phone,
                        username: data.username,
                        token_id: token,
                        provider: 'local'
                    }
                    if (data.displayName) {
                        obj.displayName = data.displayName;
                    }
                    if (data.email) {
                        obj.email = data.email;
                    }
                    if (data.profileImageURL) {
                        obj.profileImageURL = data.profileImageURL;
                    }
                    if (data.DOB) {
                        obj.dob = data.DOB;
                    }
                    if (data.address) {
                        obj.address = data.address;
                    }
                    if (data.gender) {
                        obj.gender = data.gender;
                    }
                    if (data.city) {
                        obj.city = data.city;
                    }
                    if (data.county) {
                        obj.county = data.county;
                    }
                    User(obj)
                        .save(function (err, user) {
                            if (err) {
                            //    console.log("============", err);
                                res
                                    .status(400)
                                    .send(err);
                            } else {
                                return res.json(user);
                            }
                        })
                } else {
                    var token = helper.token();
                    User.update({
                        _id: user._id
                    }, {
                        $set: {
                            token_id: token
                        }
                    }, function (err, user) {});
                    user.token_id = token;
                    res.json(user);
                }
            })
    } else {
        passport
            .authenticate('local', function (err, user, info) {
                if (err || !user) {
                    res
                        .status(422)
                        .send(info);
                } else {
                    req
                        .login(user, function (err) {
                            if (err) {
                                res
                                    .status(400)
                                    .send(err);
                            } else {
                                var token = helper.token();
                                User.update({
                                    _id: user._id
                                }, {
                                    $set: {
                                        token_id: token
                                    }
                                }, function (err, user) {});
                                user.token_id = token;
                                res.json(user);
                            }
                        });
                }
            })(req, res, next);
    }
};

/**
 * Signout
 */
exports.signout = function (req, res) {
    if (req.headers.authorization) {
        User
            .findOne({
                token_id: req.headers.authorization
            }, function (err, user) {
                if (err) {
                    return res
                        .status(401)
                        .send({message: 'Database Occurred Error', error: error});
                } else if (!user || user == null || user == '') {
                    return res
                        .status(401)
                        .send({message: 'Un Authorize User'});
                } else {
                    User
                        .findByIdAndUpdate(user._id, {
                            $set: {
                                token_id: null
                            }
                        }, function (e, r) {
                            UsedPromoCode
                                .remove({
                                    user: user._id,
                                    is_used: false
                                }, function (d) {
                                   // console.log(d);
                                    res.send({code: 200, success: true, message: "User Successfully Logout"});
                                });
                        });
                }

            });
    }
    // req.logout(); res.redirect('/');
};

/**
 * OAuth provider call
 */
exports.oauthCall = function (strategy, scope) {
    return function (req, res, next) {
        if (req.query && req.query.redirect_to) 
            req.session.redirect_to = req.query.redirect_to;
        
        // Authenticate
        passport.authenticate(strategy, scope)(req, res, next);
    };
};

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {

        // info.redirect_to contains inteded redirect path
        passport
            .authenticate(strategy, function (err, user, info) {
                if (err) {
                    return res.redirect('/authentication/signin?err=' + encodeURIComponent(errorHandler.getErrorMessage(err)));
                }
                if (!user) {
                    return res.redirect('/authentication/signin');
                }
                req
                    .login(user, function (err) {
                        if (err) {
                            return res.redirect('/authentication/signin');
                        }
                        var token_id = helper.token();
                        user.token_id = token_id;
                        User.update({
                            _id: user._id
                        }, {
                                $set: {
                                    token_id: token_id
                                }
                            })
                            .exec(function (err, user) {
                                if (err) {
                                //    console.log(err)
                                }
                            })
                        // return res.jsonp(user);
                        return res.redirect(info.redirect_to || '/');
                    });
            })(req, res, next);
    };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function (req, providerUserProfile, done) {
    // Setup info object
    var info = {};

    // Set redirection path on session. Do not redirect to a signin or signup page
    if (noReturnUrls.indexOf(req.session.redirect_to) === -1) 
        info.redirect_to = req.session.redirect_to;
    
    if (!req.user) {
        // Define a search query fields
        var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
        var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

        // Define main provider search query
        var mainProviderSearchQuery = {};
        mainProviderSearchQuery.provider = providerUserProfile.provider;
        mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define additional provider search query
        var additionalProviderSearchQuery = {};
        additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

        // Define a search query to find existing user with current provider profile
        var searchQuery = {
            $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
        };

        User.findOne(searchQuery, function (err, user) {
            if (err) {
                return done(err);
            } else {
                if (!user) {
                    var possibleUsername = providerUserProfile.username || ((providerUserProfile.email)
                        ? providerUserProfile.email.split('@')[0]
                        : '');

                    User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                        user = new User({
                            firstName: providerUserProfile.firstName,
                            lastName: providerUserProfile.lastName,
                            username: availableUsername,
                            displayName: providerUserProfile.displayName,
                            profileImageURL: providerUserProfile.profileImageURL,
                            provider: providerUserProfile.provider,
                            providerData: providerUserProfile.providerData
                        });

                        // Email intentionally added later to allow defaults (sparse settings) to be
                        // applid. Handles case where no email is supplied. See comment:
                        // https://github.com/meanjs/mean/pull/1495#issuecomment-246090193
                        user.email = providerUserProfile.email;

                        // And save the user
                        user.save(function (err) {
                            return done(err, user, info);
                        });
                    });
                } else {
                    return done(err, user, info);
                }
            }
        });
    } else {
        // User is already logged in, join the provider data to the existing user
        var user = req.user;

        // Check if user exists, is not signed in using this provider, and doesn't have
        // that provider data already configured
        if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
            // Add the provider data to the additional provider data field
            if (!user.additionalProvidersData) {
                user.additionalProvidersData = {};
            }

            user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

            // Then tell mongoose that we've updated the additionalProvidersData field
            user.markModified('additionalProvidersData');

            // And save the user
            user.save(function (err) {
                return done(err, user, info);
            });
        } else {
            return done(new Error('User is already connected using this provider'), user);
        }
    }
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function (req, res, next) {
    var user = req.user;
    var provider = req.query.provider;

    if (!user) {
        return res
            .status(401)
            .json({message: 'User is not authenticated'});
    } else if (!provider) {
        return res
            .status(400)
            .send();
    }

    // Delete the additional provider
    if (user.additionalProvidersData[provider]) {
        delete user.additionalProvidersData[provider];

        // Then tell mongoose that we've updated the additionalProvidersData field
        user.markModified('additionalProvidersData');
    }

    user
        .save(function (err) {
            if (err) {
                return res
                    .status(422)
                    .send({
                        message: errorHandler.getErrorMessage(err)
                    });
            } else {
                req
                    .login(user, function (err) {
                        if (err) {
                            return res
                                .status(400)
                                .send(err);
                        } else {
                            return res.json(user);
                        }
                    });
            }
        });
};

exports.signupbasic = function (req, res) {
    var data = req.body;
    var requirement = {
        "firstName": null,
        "lastName": null,
        "password": null
    };
    for (var key in requirement) {
        if (!data[key] || data[key] == '' || data[key] == null) {
            //console.log("error", key);
            return res.send({
                code: 400,
                message: "Please Enter " + key,
                success: false
            });
        }
    }
    if (data['is_socail_login']) {
        var user = new User(data);
        user.provider = 'local';
        if (data.roles) {
            user.roles = data.roles;
        } else {
            user.roles = ['user'];
        }
        if (data.displayName) {
            user.displayName = data.displayName;
        }
        if (data.profileImageURL) {
            user.profileImageURL = data.profileImageURL;
        }
        if (data.DOB) {
            user.dob = data.DOB;
        }
        if (data.address) {
            user.address = data.address;
        }
        if (data.email) {
            user.email = data.email;
        }
        user.token_id = helper.token();
        user.displayName = user.firstName + ' ' + user.lastName;
        user.save(function (err) {
            if (err) {
                return res
                    .status(422)
                    .send({
                        message: errorHandler.getErrorMessage(err)
                    });
            } else {
                return res
                    .status(200)
                    .json({code: 200, message: " Successfully Signed Up ", user: user, success: true});
            }
        });
    } else {
        var user = new User(data);
        user.provider = 'local';
        if (data.roles) {
            user.roles = data.roles;
        } else {
            user.roles = ['user'];
        }
        user.token_id = helper.token();
        user.displayName = user.firstName + ' ' + user.lastName;
        user.save(function (err) {
            if (err) {
                return res
                    .status(422)
                    .send({
                        message: errorHandler.getErrorMessage(err)
                    });
            } else {
                return res
                    .status(200)
                    .json({code: 200, message: " Successfully Signed Up ", user: user, success: true});
            }
        });
    }

};

function GetFb(id, cb) {
    // http://graph.facebook.com/67563683055/picture?type=square
    let url = "https://graph.facebook.com/v2.6/" + id + "?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>";
    Facebook.api(url, function (err, data) {
        if (err) {
            cb(err);
        } else {
            cb(null, data);
        }
    });
}
// GetFb('67563683055', function(err,data){   console.log(err,data); })