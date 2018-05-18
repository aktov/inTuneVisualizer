
// Typing function
// takes in the text to spell as a string and the id of the html element
function type() {
  const speed = 1; // the less the faster
  var i = 0;

  if (this.innerHTML != undefined && this.innerHTML.length) {
    for (i = 0; i < this.innerHTML.length; i++) {
      this.innerHTML += this.innerHTML.charAt(i);
      setTimeout(type, speed);
    }
  }
}
