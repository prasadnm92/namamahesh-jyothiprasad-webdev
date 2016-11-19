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
        deleteWidget            : deleteWidget,
        reorderWidget           : reorderWidget
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
                                widgetObj.order = widgets.length+1;    //add the new widget at the end
                                widgetObj._page = pageObj._id;
                                return widgetObj.save();
                            });
                    });
            });
    }

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

    function reorderWidget(pageId, start, end) {
        console.log("start: "+start+"\nend: "+end);
        return WidgetModel
            .find({_page:pageId, order: start})
            .then(function(movedWidget) {
                console.log("movedWidget: "+JSON.stringify(movedWidget));
                if(start<end) {
                    return WidgetModel
                        .aggregate([
                            {$match: {order: {$gt:start, $lt:end}}},
                            {$project: {order: "$order"-1}},
                            {$out: "widget"}
                        ]);
                }
                else {
                    return WidgetModel
                        .aggregate(
                            [
                                {$match: {order: {$gt:end, $lt:start}}},
                                {$project: {order: "$order"+1}} //wrong!!
                            ],
                            function(err, result) {
                                if(err) console.log("122.error: "+err);
                                else {
                                    console.log("124.result: "+JSON.stringify(result));
                                }
                            });
                }
            });
        /*var movedWidget = null;
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                //if widget was moved down
                if(initial < final) {
                    if(widgets[w].order===initial) movedWidget = w;
                    else if(widgets[w].order>initial && widgets[w].order<=final) widgets[w].order-=1;
                }
                //if widget was moved up
                else {
                    if(widgets[w].order===initial) movedWidget = w;
                    else if(widgets[w].order<initial && widgets[w].order>=final) widgets[w].order+=1;
                }
            }
        }
        if(movedWidget) widgets[movedWidget].order = final;
        res.sendStatus(200);*/
    }
};