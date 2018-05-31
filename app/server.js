const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const hash = require('./static/js/hash.js');
const lastfm = require('./static/js/lastfm.js');
const firebaseHelper = require('./static/js/firebase.js');
const profile = require('./static/js/profile.js');

const db = firebase.database();
const app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
// ----------------------------------------------------------------- //

// [html/handlebars] //
app.get('/views', (req, res) => {
  res.send('hi');
});

app.post('/views/topTracks', (req, res) => {
  console.log(req.body);
  db.ref('/users/' + req.body.user + '/topTracks').on('value', (snapshot) => {
    console.log(snapshot.val());
    res.send(snapshot.val());
  }, (error) => {
    console.log("Error" + error.code);
  })
});
// ----------------------------------------------------------------- //

app.post('/signup', (req,res) => {
  const email = req.body.email;
  const pw = req.body.password;

  firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then((userRecord) => {
      db.ref('userProfile/' + userRecord.uid).set({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
      });
      lastfm.updateTopTracks(req.body.username);
      res.sendStatus(201).end();
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == 'auth/email-already-in-use'){
        console.log('Email in use');
      }else if(errorCode == 'auth/invalid-email'){
        console.log('Invalid email');
      }else{
        console.log(error.message);
      }
      res.send(error);
    });
});

app.post('/login', (req,res) => {
  const email = req.body.email;
  const pw = req.body.password;
  console.log('login attempted')
  firebase.auth().signInWithEmailAndPassword(email,pw)
    .then((userRecord) =>{
      firebaseHelper.getUsername(userRecord.uid).then(username => {
        profile.updateTopSongs(userRecord.uid, username);
        profile.updateFriends(userRecord.uid, username);
        res.status(200);
        res.send({uid: userRecord.uid, username: username});
      });
    }, error => {
      res.status(400);
      res.send(error);
    });
});

app.post('/topTracks', (req, res) => {
  firebaseHelper.getTopSongs(req.body.user).then(result => {
    res.send(result);
  });
});

app.post('/getSimilarTags', (req, res) => {
  console.log(req.body.friend);
  firebaseHelper.getFriendId(req.body.friend).then(result => {
    profile.getSimilarTags(req.body.user, result).then(result => {
      res.send(result);
    })
  });
})
/*
app.post('/topAlbums', (req, res) => {


})
*/

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/');
  /*
  db.ref('userProfile').once('value').then((snapshot) => {
    snapshot.forEach((childId) => {
      let keyId = childId.key;
      let username = childId.val().username;
      profile.updateTopSongs(keyId, username);
      profile.updateFriends(keyId, username);
    });
  });*/
});
