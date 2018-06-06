/*
File: server.js
Purpose: Allows our app to hosted on a server. Also creates several functions that we call using ajax
throughout our app. It links a lot of the backend functionality to our frontend through the use of 
POST/GET requests.
*/

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
      res.sendStatus(201).end();
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == 'auth/email-already-in-use'){
        console.log('Email in use');
      }else if(errorCode == 'auth/invalid-email'){
        console.log('Invalid email');
      }else{
        console.log(error.message)
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

app.post('/getFriends', (req, res) => {
  firebaseHelper.getUsername(req.body.user).then(result => {
    return result;
  }).then(username => {
    profile.updateFriends(req.body.user, username);
  })
  firebaseHelper.getFriends(req.body.user).then(result => {
    res.send(result);
  });
});

app.post('/getSimilarSongs', (req, res) => {
  let currentWeight = 0;
  const weight = 250;
  let similarTags = [];
  let similarSongs = [];
  firebaseHelper.getFriendId(req.body.friend).then(result => {
    let p1 = firebaseHelper.getTopSongs(req.body.user);
    let p2 = firebaseHelper.getTopSongs(result);
    Promise.all([p1,p2]).then(data=>{
      for(genre in data[0]){
        let data1Keys = Object.keys(data[1]);
        if(data1Keys.includes(genre)){
          similarTags.push(genre);
          let genreKeys = Object.keys(data[1][genre]);
          currentWeight += 5;
          for(song in data[0][genre]){
            //console.log(data[0][genre][song]);
            if(genreKeys.includes(data[0][genre][song])){
              console.log(data[0][genre][song].name);
              currentWeight += 10;
            }
          }
        }
      }
      data[2] = similarTags;
      data[3] = similarSongs;
      data[4] = currentWeight;
      res.send(data);
    })
  });
})

app.post('/addFriends', (req, res) => {
  let newFriend = req.body.friend;
  let userID = req.body.uid;
  db.ref('userProfile/' + userID + '/friends/' + newFriend).set({newFriend: "true"});
  res.send("Friend Added Successfully!")
});

app.post('/updateEmail', (req, res) => {
  let newEmail = req.body.email;
  let userID = req.body.uid;
  db.ref('userProfile/' + userID).update({email: newEmail});
  res.send("Email Updated Successfully!")
});


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
