/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({dest: __dirname+'/../../public/assignment/uploads'});

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
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

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
        res.send(getWidgetById(widgetId));
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        res.send(updateWidgetById(widgetId, widget));
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

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widget        = getWidgetById(widgetId);

        //get the widget's attributes
        var width         = req.body.width;
        var name          = req.body.name;
        var text          = req.body.text;

        var metadata = {
            originalname    : req.file.originalname, // file name on user's computer
            filename        : req.file.filename,     // new file name in upload folder
            fullPath        : req.file.path,         // full path of uploaded file
            size            : req.file.size,
            mimeType        : req.file.mimetype
        };

        var url = "uploads/"+metadata.filename;
        widget.url = url;

        widget.width = width;
        widget.name = name;
        widget.text = text;
        widget.metadata = metadata;
        widget = updateWidgetById(widgetId, widget);

        if(widget)
            res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        else res.redirect("back");
    }

    function getWidgetById(widgetId) {
        var widget = undefined;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widget = widgets[w];
                break;
            }
        }
        return widget;
    }

    function updateWidgetById(widgetId, widget) {
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widget._id = widgets[w]._id;
                widget.pageId = widgets[w].pageId;
                widgets[w] = widget;
                return widget;
            }
        }
        return null;
    }
};