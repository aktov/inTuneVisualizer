const lastfm = require('./lastfm.js');
const firebaseHelper = require('./firebase.js');

module.exports = {
  updateTopSongs : function(id, user, period='1month', limit=10){
    //collect all the track info
    lastfm.getTopSongs(user,period,limit).then((result) => {
      let tracks = [];
      for(song in result.toptracks.track){
        tracks.push(result.toptracks.track[song]);
      }

      let newTracks = Promise.all(tracks.map((song) => {
        return new Promise((resolve, reject) => {
          lastfm.getTrackInfo(id, user, song.name, song.artist.name).then((result) => {
            if(result){
              song = {
                name: result.tracks.name,
                artist: result.tracks.artist.name,
                playcount: result.tracks.playcount,
                url: result.tracks.url,
                tags: result.tracks.toptags
              };
              resolve(song);
            }else{
              song = {};
              resolve(song);
            }
          }, error => {
            //console.log("error handdled here");
            reject("error handled here");
          });
        });
      })).then(data => {
        firebaseHelper.updateTopSongs(id, data);
      }, error => {
        console.log('rejected some');
      })
    })
  },

  updateFriends : function(userId, user){
    lastfm.getFriends(userId, user).then(result => {
      if(result.friends){
        firebaseHelper.updateFriends(userId, result.friends);
      }else{
      }
    })
  },

  getFriendsSongs : function(userId){
    return new Promise((resolve, reject) => {
      firebaseHelper.getFriends(userId).then(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    })
  }
}
