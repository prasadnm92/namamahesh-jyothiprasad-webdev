/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");

    var ImageMetadataSchema = mongoose.Schema({
        originalName: String,
        filename: String,
        fullPath: String,
        size: String,
        mimeType: String
    });

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        metadata : ImageMetadataSchema,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});

    return WidgetSchema;
};