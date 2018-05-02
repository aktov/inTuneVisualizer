const firebaseHelper = require('./firebase.js');
const request = require('request');

module.exports = {
  getFriends: function(user){
    $.ajax({
        type : 'POST',
        url : 'http://ws.audioscrobbler.com/2.0/',
        data : 'method=user.getfriends&' +
               'user='+ user + '&'+
               'api_key=c301dcb01712819d2fc028cdc3fec536&' +
               'format=json',
        dataType : 'jsonp',
        success : function(data) {
            console.log(JSON.stringify(data));
        },
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
        }
    });
  },

  getTopSongs: function(id, user, period='1month', limit=10){
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url: 'http://ws.audioscrobbler.com/2.0/',
      body: 'method=user.gettoptracks&' +
             'user='+ user + "&" +
             'period=' + period + '&' +
             'limit=' + limit + '&' +
             'api_key=c301dcb01712819d2fc028cdc3fec536&' +
             'format=json'
    }, (error, response, body) => {
      const json = JSON.parse(body);
      firebaseHelper.updateTopSongs(id, json.toptracks);
    })
  }
}
