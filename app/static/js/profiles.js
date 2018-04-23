// Username: password, {friends}

var profiles = {
  'Brandon': ['brandon', ['Alex', 'Vanna', 'Jason']],
  'Alex': ['alex', ['Brandon', 'Vanna', 'Jason']],
  'Vanna': ['vanna', ['Brandon', 'Alex', 'Jason']],
  'Jason': ['jason', ['Brandon', 'Alex', 'Vanna']]
}

function remember(name, ind) {
  sessionStorage.user = name;
  sessionStorage.userIndex = ind;
}

function forget() {
  sessionStorage.user = "blank";
  sessionStorage.userIndex = "blank";
}
