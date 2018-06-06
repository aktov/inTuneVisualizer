/*
File: hash.js
Purpose: Contains a hash function to generate unique user IDs in our database to avoid future collisions
and a more efficient way to store users in the long term if we were to increase the number of users
drastically. 
*/

module.exports = {
  hash: function(str) {
    let hash = 5381,
        i = str.length;
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
  }
}
