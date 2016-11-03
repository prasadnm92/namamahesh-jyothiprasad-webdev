/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        for(var p in pages) {
            if(pages[p].websiteId===websiteId && pages[p].name===page.name) {
                res.send(null);
                return;
            }
        }
        page._id = new Date().getTime().toString();
        page.websiteId = websiteId;
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var websitePages = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) websitePages.push(pages[p]);
        }
        res.send(websitePages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id===pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send(undefined);
    }

    function updatePage(req, res) {
        var pageId = req.params.pid;
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id===pageId) {
                page._id = pageId;
                page.websiteId = pages[p].websiteId;
                pages[p] = page;
                res.send(page);
                return;
            }
        }
        res.send(null);
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id===pageId) {
                pages.splice(p,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};