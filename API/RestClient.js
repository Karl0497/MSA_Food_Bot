var request = require('request');

exports.getFavouriteFood = function getData(url, session, username, callback) {
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session, username);
        }
    });
};
exports.getYelpData = function getData(url,bearer,session, callback){
    
        request.get(url,{'auth': { 'bearer': bearer}} ,function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body,session);
            }
        });
    };