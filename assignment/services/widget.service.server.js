/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app) {
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = new Date().getTime().toString();
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        var pageWidgets = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) pageWidgets.push(widgets[w]);
        }
        res.send(pageWidgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send(undefined);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widget._id = widgets[w]._id;
                widget.pageId = widgets[w].pageId;
                widgets[w] = widget;
                res.send(widget);
                return;
            }
        }
        res.send(null);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};