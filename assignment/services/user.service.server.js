/**
 * Created by prasadnm on 11/2/16.
 */
module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        for(var u in users) {
            if(user.username === users[u].username) {
                res.send(null);
            }
        }
        user._id = new Date().getTime().toString();
        users.push(user);
        res.send(user);

    }

    function findUser(req, res) {
        if(req.query.username) {
            if(req.query.password) findUserByCredentials(req, res);
            else findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) res.send(users[u]);
        }
        res.send(undefined);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) res.send(users[u]);
        }
        res.send(undefined);
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id === uid) res.send(users[u]);
        }
        res.send(undefined);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id === uid) {
                users[u] = user;
                res.send(user);
                return;
            }
        }
        res.send(null);
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id === uid) {
                users.splice(u,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
    }
};