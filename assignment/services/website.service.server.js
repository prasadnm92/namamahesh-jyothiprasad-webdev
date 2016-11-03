/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.uid;
        var website = req.body;
        for(var w in websites) {
            if(websites[w].developerId===userId && websites[w].name===website.name) {
                res.send(null);
            }
        }
        website._id = new Date().getTime().toString();
        website.developerId = userId;
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        var userWebsites = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) userWebsites.push(websites[w]);
        }
        res.send(userWebsites);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id===wid) {
                res.send(websites[w]);
                return;
            }
        }
        res.send(undefined);
    }

    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;
        for(var w in websites) {
            if(websites[w]._id===wid) {
                website._id = websites[w]._id;
                website.developerId = websites[w].developerId;
                websites[w] = website;
                res.send(website);
                return;
            }
        }
        res.send(undefined);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id===wid) {
                websites.splice(w,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};