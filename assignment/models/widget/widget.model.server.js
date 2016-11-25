/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel                : setModel,
        createWidget            : createWidget,
        findAllWidgetsForPage   : findAllWidgetsForPage,
        findWidgetById          : findWidgetById,
        updateWidget            : updateWidget,
        deleteWidget            : deleteWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(function(widgetObj) {
                return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function(pageObj) {
                        return findAllWidgetsForPage(pageId)
                            .then(function(widgets) {
                                pageObj.widgets.push(widgetObj._id);
                                pageObj.save();
                                widgetObj._page = pageObj._id;
                                return widgetObj.save();
                            });
                    });
            });
    }

    //use mode.pageModel.findWidgetsForPage(pageId) instead
    function findAllWidgetsForPage(pageId) {
        return WidgetModel
            .find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel
            .findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name?widget.name:null,
                    text: widget.text?widget.text:null,
                    placeholder: widget.placeholder?widget.placeholder:null,
                    description: widget.description?widget.description:null,
                    url: widget.url?widget.url:null,
                    width: widget.width?widget.width:null,
                    height: widget.height?widget.height:null,
                    rows: widget.rows?widget.rows:null,
                    size: widget.size?widget.size:null,
                    class: widget.class?widget.class:null,
                    icon: widget.icon?widget.icon:null,
                    metadata: widget.metadata?widget.metadata:null,
                    deletable: widget.deletable?widget.deletable:null,
                    formatted: widget.formatted?widget.formatted:null
                }
            );
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .findById(widgetId)
            .then(function(widgetObj) {
                var pageId = widgetObj._page;
                return model
                    .pageModel
                    .removeWidgetFromPage(pageId, widgetId)
                    .then(function(page) {
                        return WidgetModel
                            .remove({_id: widgetId});
                    });
            });
    }
};