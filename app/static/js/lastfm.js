function getFriends(user){
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
  }

  function getTopTracks(user, period='1month', limit=10){
    $.ajax({
        type : 'POST',
        url : 'http://ws.audioscrobbler.com/2.0/',
        data : 'method=user.gettoptracks&' +
               'user='+ user + "&" +
               'period=' + period + '&' +
               'limit=' + limit + '&' +
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
    }
