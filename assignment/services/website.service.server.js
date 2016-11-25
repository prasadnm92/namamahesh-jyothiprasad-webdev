/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app, model) {
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
        model
            .websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(userWebsites) {
                    res.send(userWebsites);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(wid)
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