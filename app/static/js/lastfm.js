/*
File: lastfm.js
Purpose: Contains methods that utilize the last.fm API. These methods pull data from a user's last.fm
accounts online, and imports that data into our database. Most of these methods either pull data about
the users: their friends, their top songs, or the methods pull information about their top songs, such
as the tags for that song.

*/

const firebaseHelper = require('./firebase.js');
const request = require('request');

module.exports = {
  getFriends: function(id, user, limit=50){
    return new Promise((resolve, reject) => {
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'http://ws.audioscrobbler.com/2.0/',
        body: 'method=user.getfriends&' +
               'user='+ user + "&" +
               'limit=' + limit + '&' +
               'api_key=c301dcb01712819d2fc028cdc3fec536&' +
               'format=json'
      }, (error, response, body) => {
        if(error){
          reject("Error getting friends from lastfm");
        }else{
          resolve(JSON.parse(body));
        }
      })
    })
  },

  getTopSongs: function(user, period='1month', limit=50){
    return new Promise((resolve, reject) => {
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
        if(error){
          reject("Error in getTopSongs")
        }else{
          resolve(json);
        }
      })
    });
  },

  getTrackInfo: function(id, user, title, artist){
    return new Promise((resolve, reject) => {
      request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: 'http://ws.audioscrobbler.com/2.0/',
          body: 'method=track.getInfo&' +
                 'track=' + title + '&' +
                 'artist=' + artist + '&' +
                 'username=' + user + '&' +
                 'api_key=c301dcb01712819d2fc028cdc3fec536&' +
                 'format=json'
        }, (error, response, body) => {
          let json = JSON.parse(body);
          if(json.track){
            resolve({id: id, tracks: json.track});
            //firebaseHelper.updateTopSongs(id, json.track);
          }else{
            //console.log("Rejected because " + json.track);
            resolve(json.track);
          }
          if(error){
            reject("Error getting track info");
          }
        });
    });
  }
}
