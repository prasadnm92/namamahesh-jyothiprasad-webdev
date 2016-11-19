/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app, model) {
    var multer = require('multer');
    var upload = multer({dest: __dirname+'/../../public/assignment/uploads'});
    /* If the file needs to be save with its filetype extension
    //$> npm install mime --save
    var mime = require('mime');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    */

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "order": 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "order": 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "order": 5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 6}
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pid/widget", sortWidgets);

    function createWidget(req, res) {
        var pageId = req.params.pid;
        var widget = req.body;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(pageWidgets) {
                    //order widgets based on the order in which they are placed on the page
                    pageWidgets.sort(function(a, b) {
                        return a.order > b.order;
                    });
                    res.send(pageWidgets);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
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
                model
                    .widgetModel
                    .updateWidget(widgetId, widget)
                    .then(
                        function(status) {
                            //console.log(status.toString());
                            if(status.ok==1)
                                res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                            else res.redirect("back");
                        },
                        function(error) {
                            res.sendStatus(400).send(error);
                        }
                    );
            });
    }

    function sortWidgets(req, res) {
        var pid = req.params.pid;
        var initial = parseInt(req.query.initial);
        var final   = parseInt(req.query.final);
        res.sendStatus(200);
        /*if(initial===final) {
            res.sendStatus(200);
        }
        else {
            model
                .widgetModel
                .reorderWidget(pid, initial, final)
                .then(
                    function(something) {
                        console.log("something: "+something.toString());
                        res.sendStatus(200);
                    },
                    function(error) {
                        console.log("183.error: "+error.toString());
                        res.sendStatus(400).send(error);
                    }
                );
        }*/
    }
};