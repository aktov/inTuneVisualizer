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

// ----------------------- Create --------------------------//

  createNewUser : function(username){
    let userHash = Hash.hash(username);
    db.ref('UserHashes/' + username).set(userHash);
    db.ref('userProfile/' + userHash).set({
      username: username
    });
    return userHash;
  },

// ----------------------- Update --------------------------//

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

  updateFriends : function(userId, friendList){
    return new Promise((resolve, reject) => {
      let promises = [];
      for(friend in friendList.user){
        promises.push(module.exports.userExists(friendList.user[friend].name));/*
        module.exports.friendExists(userId, friendList.user[friend].name).then(result => {
          db.ref('userProfile/' + userId + '/friends/' + result.username).set('true');
        }, error => {
        });*/
      }
      Promise.all(promises).then(users => {
        let newUsers = [];
        for(user in users){
          if(users[user].exists){
          }else{
            newUsers.push(users[user].username);
          }
        }
        resolve(newUsers);
      }, error => { reject();});
    })
  },

// ----------------------- Push --------------------------//

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

// ----------------------- Checks --------------------------//

  userExists : function(username){
    return new Promise((resolve,reject) => {
      db.ref('UserHashes').once('value').then(snapshot => {
        if(snapshot.val().hasOwnProperty(username)){
          resolve({username: username, exists: true})
        }else{
          resolve({username: username, exists: false});
          console.log(username + " does not exist");
        }
      })
    })
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

  friendExists : function(userId, friendUsername){
    return new Promise((resolve, reject) => {
      db.ref('userProfile/' + userId).once('value').then((snapshot) => {
        if(snapshot.val().hasOwnProperty('friends')){
          if(snapshot.val().friends.hasOwnProperty(friendUsername)){
            reject({exists: true});
          }else{
            resolve({username: friendUsername});
          }
        }else{
          resolve({exists: false});
        }
      })
    });
  },

// ----------------------- Getters --------------------------//

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
