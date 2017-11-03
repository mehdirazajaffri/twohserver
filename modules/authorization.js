var mongoose = require('mongoose');
var User = mongoose.model('User');
exports.isAdminAllowed = function (req, res, next) {
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
                    if (user.roles.indexOf('admin') != -1) {
                        req.user = user;
                        next();
                    } else {
                        return res
                            .status(401)
                            .send({message: 'Un Authorize User'});
                    }
                }

            })
    } else {
        return res
            .status(401)
            .send({message: 'Un Authorize User'});
    }
};

exports.isUserAllowed = function (req, res, next) {
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
                    if (user.roles.indexOf('admin') != -1 || user.roles.indexOf('user') != -1) {
                        req.user = user;
                        next();
                    } else {
                        return res
                            .status(401)
                            .send({message: 'Un Authorize User'});
                    }
                }

            })
    } else {
        return res
            .status(401)
            .send({message: 'Un Authorize User'});
    }
}
