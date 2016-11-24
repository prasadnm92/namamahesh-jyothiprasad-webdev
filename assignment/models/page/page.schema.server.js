/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: String,
        title: String,
        description: String,
        //order of widgets in the array determines the order of rendering them in the page as well
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});

    return PageSchema;
};