function generateGauge(id){
  var chart = c3.generate({
    bindto: id,
    data: {
        columns: [
            ['data', 9.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
//        label: {
//            format: function(value, ratio) {
//                return value;
//            },
//            show: false // to turn off the min/max labels.
//        },
//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
//    max: 100, // 100 is default
//    units: ' %',
//    width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 180
    }
  });
  return chart;
}

function loadGauge(chart, data){
  setTimeout(function () {
      chart.unload({
          ids: 'data'
      });
  }, 	500);
  chart.load({
        columns: [['Music Compatibility', data]]
    });
}

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

function pieChartOnClick(data){

}
