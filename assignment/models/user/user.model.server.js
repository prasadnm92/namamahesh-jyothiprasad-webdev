/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var Q = require("q");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel                : setModel,
        createUser              : createUser,
        findUserByUsername      : findUserByUsername,
        findUserByCredentials   : findUserByCredentials,
        findUserById            : findUserById,
        updateUser              : updateUser,
        deleteUser              : deleteUser,
        removeWebsiteFromUser   : removeWebsiteFromUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel
            .create(user);
    }

    function findUserByUsername(username) {
        return UserModel
            .findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return UserModel
            .findOne({username: username,
                password: password});
    }

    function findUserById(userId) {
        return UserModel
            .findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function deleteUser(userId) {
        return removeUser(userId);
    }

    function removeUser(userId) {
        return UserModel
         .findById(userId)
         .select({"_id":0, "websites":1})
         .then(function(userWebsites) {
             var promises = userWebsites.websites.map(function(website) {
                 return model.websiteModel.removeWebsite(website);
             });
             return Q
                 .all(promises)
                 .then(function() {
                     return UserModel.remove({_id:userId});
                 });
         });
    }

    function removeWebsiteFromUser(userId, websiteId) {
        return UserModel
            .findById(userId)
            .then(function(userObj) {
                var websites = userObj.websites;
                for(var w in websites) {
                    if(websites[w].toString()===websiteId) websites.splice(w,1);
                }
                userObj.websites = websites;
                return userObj.save();
            });
    }
};