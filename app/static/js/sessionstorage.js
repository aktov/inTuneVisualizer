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
