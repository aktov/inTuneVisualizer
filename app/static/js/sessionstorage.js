/*
File: sessionstorage.js
Purpose: Contains methods that allow the browser to store some important details about a user's
session in order to allow the other methods to run. This data includes username, userID, and user
index. These values help us update, access, and change the database in the backend to keep our data
a little bit more secure.
*/

function remember(name, ind, uid) {
  sessionStorage.setItem('user', name);
  sessionStorage.setItem('ind', ind);
  sessionStorage.setItem('uid', uid);/*
  sessionStorage.user = name;
  sessionStorage.userIndex = ind;
  sessionStorage.uid = uid;*/
}

function forget() {
  sessionStorage.user = "blank";
  sessionStorage.userIndex = "blank";
  sessionStorage.uid = "blank";
}

function savePieChartData(data){
  sessionStorage.setItem('data', data);
}
