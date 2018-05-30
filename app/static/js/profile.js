const lastfm = require('./lastfm.js');
const firebaseHelper = require('./firebase.js');

const genres = ['Hip-Hop', 'rap', 'rnb', 'indie', 'pop', 'trap', 'country', 'rock', 'oldies',
'alternative', 'electronic', 'jazz', 'folk', 'blues', 'punk', 'punk rock', 'edm', 'dubstep', 'indie rock',
'techno', 'orchestra', 'reggae', 'pop rock', 'metal', 'funk', 'classical', 'instrumental', 'korean', 'ballad',
'acoustic', 'gospel', 'disco', 'soul', 'classic', 'hip hop'];

module.exports = {
  updateTopSongs : function(id, user, period='1month', limit=50){
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
              let tags = module.exports.filterTags(result.tracks.toptags);
              song = {
                name: result.tracks.name,
                artist: result.tracks.artist.name,
                playcount: result.tracks.playcount,
                url: result.tracks.url,
                tags: tags
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

  getFriends : function(userId){
    return new Promise((resolve, reject) => {
      firebaseHelper.getFriends(userId).then(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    })
  },

  getSimilarTags: function(userId, friendId){
    return new Promise((resolve,reject) =>{
      let p1 = firebaseHelper.getTopTags(userId);
      let p2 = firebaseHelper.getTopTags(friendId);
      Promise.all([p1,p2]).then(result => {
        let similarTags = [];
        let userIdKeys = Object.keys(result[0]);
        for(key in userIdKeys){
          if(result[1].hasOwnProperty(userIdKeys[key])){
            similarTags.push(userIdKeys[key]);
          }
        }
        resolve(similarTags);
      }, error => {
        reject(error);
      });
    })
  },

  filterTags : function(tags){
    let filteredTags = [];
    let allTags = tags.tag;
    for(tag in allTags){
      if(genres.includes(allTags[tag].name)){
        filteredTags.push(allTags[tag].name);
      }
    }
    return filteredTags
  }
}
