const firebase = require('firebase');
const lastfm = require('./lastfm.js');
const Hash = require('./hash.js');

const config = {
    apiKey: "AIzaSyBsHsIuWG4Tcvn1fMHOoxH_Dp_A2fK1Rco",
    authDomain: "friendoabjv.firebaseapp.com",
    databaseURL: "https://friendoabjv.firebaseio.com",
    projectId: "friendoabjv",
    storageBucket: "friendoabjv.appspot.com",
    messagingSenderId: "157387684680"
  };

firebase.initializeApp(config);

const db = firebase.database();

module.exports = {
  updateTopSongs : function(userId, songList){
    songList.forEach(song => {
      let songSize = Object.keys(song).length;
      let topTracksRef = db.ref('userProfile/' + userId + '/topTracks');
      if(songSize > 0){
        module.exports.songExists(userId, song).then(result => {
          module.exports.pushSong(userId, song, result.hashId);
        }, error => {
        });
      }else{
      }
    });
  },

  songExists : function(userId, song){
    return new Promise((resolve, reject) => {
      let hashId = Hash.hash(JSON.stringify({song: song.name, artist: song.artist.name}));
      db.ref('userProfile/' +userId).once('value').then((snapshot) => {
        if(snapshot.val().hasOwnProperty('songs')){
          if(snapshot.val().songs.hasOwnProperty(hashId)){
            reject({exists: true});
          }else{
            resolve({hashId: hashId});
          }
        }else{
          db.ref('userProfile/' + userId + '/songs').set({
            length : 0
          });
          resolve({hashId: hashId});
        }
      });
    });
  },

  pushSong : function(userId, song, hashId){
    let tags = song.tags;
    if(tags.length > 0){
      for(tag in tags){
        pushKey = db.ref('userProfile/' + userId + '/topTracks/' + tags[tag]).child(hashId).set({
          name: song.name,
          playcount: song.playcount,
          artist: song.artist,
          url: song.url
        });
        module.exports.pushSongHash(userId, tags[tag], hashId);
      }
    }else{
      pushKey = db.ref('userProfile/' + userId + '/topTracks/other').child(hashId).set({
        name: song.name,
        playcount: song.playcount,
        artist: song.artist,
        url: song.url
      });
      module.exports.pushSongHash(userId, 'other', hashId);
    }
  },

  pushSongHash : function(userId, tag, hashId){
    db.ref('userProfile/' + userId +'/songs/' + hashId).child(tag).set("true");
  },

  updateFriends : function(userId, friendList){
    for(friend in friendList.user){
      console.log(friendList.user[friend]);
      module.exports.friendExists(userId, friendList.user[friend].name).then(result => {
        db.ref('userProfile/' + userId + '/friends/' + friendList.user[friend].name).set('true');
      }, error => {
      })
    }
  },

  friendExists : function(userId, friendUsername){
    return new Promise((resolve, reject) => {
      db.ref('userProfile/' + userId).once('value').then((snapshot) => {
        if(snapshot.val().hasOwnProperty('friends')){
          if(snapshot.val().friends.hasOwnProperty(friendUsername)){
            reject({exists: true});
          }else{
            resolve({exists: false});
          }
        }else{
          resolve({exists: false});
        }
      })
    });
  },

  getFriends : function(userId){
    return new Promise((resolve, reject) => {
      db.ref('userProfile/' + userId + '/friends').once('value').then(snapshot => {
        resolve(snapshot.val());
      }, error => { reject('oops'); });
    })
  },

  getFriendId : function(friendUsername){
    return new Promise((resolve, reject) => {
      db.ref('UserHashes/' + friendUsername).once('value').then(snapshot => {
        resolve(snapshot.val());
      }, error => {
        reject(error);
      })
    })
  },

  getTopSongs : function(id){
    return new Promise((resolve, reject) => {
      db.ref('userProfile/' + id + '/topTracks').once('value').then(snapshot => {
        resolve(snapshot.val());
      }, error => {
        reject(error);
      });
    });
  },

  getUsername : function(id){
    return new Promise((resolve, reject) => {
      db.ref('userProfile/' + id + '/username').once('value').then(snapshot => {
        resolve(snapshot.val());
      }, error => {
        reject(error);
      });
    });
  }
}
