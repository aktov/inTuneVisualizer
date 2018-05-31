function loadPieChart(chart, data){
  let columns = [];
  for(genre in data){
    let category = [];
    category.push(genre);
    let songs = data[genre];
    for(song in songs){
      category.push(Number.parseInt(songs[song].playcount, 10));
    }
    columns.push(category);
  }
  chart.load({
    columns: columns
  });
}
