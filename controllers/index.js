var url = require('url');
exports.index = function(req, res, next) {
    console.log("Fetching Index html cont" +  __dirname+'./../public');
    res.sendFile('index.html', {root: __dirname+'./../public'});
};