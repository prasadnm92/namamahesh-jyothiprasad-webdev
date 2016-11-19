/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        setModel                : setModel,
        createPageForWebsite    : createPageForWebsite,
        findAllPagesForWebsite  : findAllPagesForWebsite,
        findPageById            : findPageById,
        updatePage              : updatePage,
        deletePage              : deletePage,
        removeWidgetFromPage    : removeWidgetFromPage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPageForWebsite(websiteId, page) {
        return PageModel
            .create(page)
            .then(function(pageObj) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function(websiteObj) {
                        websiteObj.pages.push(pageObj._id);
                        websiteObj.save();
                        pageObj._website = websiteObj._id;
                        return pageObj.save();
                    });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel
            .find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel
            .findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    title: page.title,
                    description: page.description
                }
            );
    }

    function deletePage(pageId) {
        return PageModel
            .findById(pageId)
            .then(function(pageObj) {
                var websiteId = pageObj._website;
                return model
                    .websiteModel
                    .removePageFromWebsite(websiteId, pageId)
                    .then(function(website) {
                        return PageModel
                            .remove({_id: pageId});
                    });
            });
    }

    function removeWidgetFromPage(pageId, widgetId) {
        return PageModel
            .findById(pageId)
            .then(function(pageObj) {
                var widgets = pageObj.widgets;
                for(var w in widgets) {
                    if(widgets[w].toString()===widgetId) widgets.splice(w,1);
                }
                pageObj.widgets = widgets;
                return pageObj.save();
            });
    }
};