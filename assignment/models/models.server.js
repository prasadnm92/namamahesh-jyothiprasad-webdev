/**
 * Created by prasadnm on 11/17/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';
    //for production: mongodb://<dbuser>:<dbpassword>@ds035796.mlab.com:35796/web-dev
    if(process.env.MLAB_PASSWORD) {
        console.log("Connecting to production mongo...");
        connectionString = 'mongodb://' +
            process.env.MLAB_USERNAME + ':' +
            process.env.MLAB_PASSWORD +
            '@ds035796.mlab.com:35796/web-dev';
    }
    else console.log("Connecting to local mongo...");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};