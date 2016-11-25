/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        setModel                : setModel,
        createWebsiteForUser    : createWebsiteForUser,
        findAllWebsitesForUser  : findAllWebsitesForUser,
        findWebsiteById         : findWebsiteById,
        updateWebsite           : updateWebsite,
        deleteWebsite           : deleteWebsite,
        removePageFromWebsite   : removePageFromWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj) {
                return model
                    .userModel
                    .findUserById(userId)
                    .then(function(userObj) {
                        userObj.websites.push(websiteObj._id);
                        userObj.save();
                        websiteObj._user = userObj._id;
                        return websiteObj.save();
                    });
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel
            .find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel
            .findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .then(function(websiteObj) {
                var userId = websiteObj._user;
                return model
                    .userModel
                    .removeWebsiteFromUser(userId, websiteId)
                    .then(function(user) {
                        return WebsiteModel
                            .remove({_id: websiteId});
                    });
            });
    }

    function removePageFromWebsite(websiteId, pageId) {
        return WebsiteModel
            .findById(websiteId)
            .then(function(websiteObj) {
                var pages = websiteObj.pages;
                for(var p in pages) {
                    if(pages[p].toString()===pageId) pages.splice(p,1);
                }
                websiteObj.pages = pages;
                return websiteObj.save();
            });
    }
};