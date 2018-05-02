const firebase = require('firebase');

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
  updateTopSongs : function(userId, list){
    console.log('updateTopSongs triggered');
    list.track.forEach((song) => {
      db.ref('userProfile/' + userId + '/topTracks').push({
        name: song.name,
        playcount: song.playcount,
        artist: song.artist.name,
        url: song.url
      });
    });
  }
}
