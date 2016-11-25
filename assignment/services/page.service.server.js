/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app, model) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        model
            .pageModel
            .createPageForWebsite(websiteId, page)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(websitePages) {
                    res.send(websitePages);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var page = req.body;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function(status) {
                    res.send(true);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};