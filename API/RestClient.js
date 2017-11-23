var request = require('request');

exports.getFavouriteFood = function getData(url, session, username, callback) {
  request.get(url, {
    'headers': {
      'ZUMO-API-VERSION': '2.0.0'
    }
  }, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {

      callback(body, session, username);
    }
  });
};
exports.getYelpData = function getData(url, bearer, session, callback) {

  request.get(url, {
    'auth': {
      'bearer': bearer
    }
  }, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      callback(body, session);
    }
  });
};

exports.deleteFavouriteFood = function deleteData(url, session, username, favouriteFood, id, callback) {
  var options = {
    url: url + "\\" + id,
    method: 'DELETE',
    headers: {
      'ZUMO-API-VERSION': '2.0.0',
      'Content-Type': 'application/json'
    }
  };

  request(options, function(err, res, body) {
    if (!err && res.statusCode === 200) {
    
      callback(body, session, username, favouriteFood);
    } else {
      console.log(err);
      console.log(res);
    }
  })

};
