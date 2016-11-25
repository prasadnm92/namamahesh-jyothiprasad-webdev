/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    return UserSchema;
};