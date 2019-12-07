// variables:
var w = 600
var h = 400
var barPadding = 1
var padding = 15

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

var parseYear = d3.timeParse('%Y')

// helper functions:
var rowConverter = function (d) {
  // convert data from string to other formats where needed
  // below are columns of the full dataset
  // return {
  //     Critic_Score: parseFloat(d.Critic_Score),
  //     Developer: d.Developer,
  //     ESRB_Rating: d.ESRB_Rating,
  //     Genre: d.Genre,
  //     Global_Sales: parseFloat(d.Global_Sales),
  //     JP_Sales: parseFloat(d.JP_Sales),
  //     Last_Update: d.Last_Update,
  //     NA_Sales: parseFloat(d.NA_Sales),
  //     Name: d.Name,
  //     Other_Sales: parseFloat(d.Other_Sales),
  //     PAL_Sales: parseFloat(d.PAL_Sales),
  //     Platform: d.Platform,
  //     Publisher: d.Publisher,
  //     Rank: parseFloat(d.Rank),
  //     Total_Shipped: parseFloat(d.Total_Shipped),
  //     User_Score: parseFloat(d.User_Score),
  //     VGChartz_Score: parseFloat(d.VGChartz_Score),
  //     Vgchartzscore: parseFloat(d.Vgchartzscore),
  //     Year: parseFloat(d.Year),
  //     basename: d.basename,
  //     img_url: d.img_url,
  //     status: d.status,
  //     url: d.url
  // };
  return { // num games per publisher file
    Publisher: d.Publisher,
    Year: parseYear(d.Year), // +d.Year,
    Num_games: +d.Num_games
  }
}

// dataset
var dataset

// load and use dataset
// everything you want to do needs to be within the data loading function (csv)
// d3.csv("data/vgsales-12-4-2019.csv", rowConverter, function(data) {
d3.csv('data/vgsales-12-4-2019_num_publishers.csv', rowConverter, function (data) {
  dataset = data

  // console.table(data);
  // console.log(data);

  // partial data selection for testing
  var newdata = dataset.filter(function (d) { return d.Publisher === 'Nintendo' })
  console.log(newdata)

  var xScale = d3.scaleTime()
    .domain([
      d3.min(newdata, function (d) { return d.Year }),
      d3.max(newdata, function (d) { return d.Year })
    ])
    .range([padding, w - padding])

  // var yScale = d3.scaleLinear()
  //   .domain([d3.min(newdata, function (d) { return d.Num_games }),
  //     d3.max(newdata, function (d) { return d.Num_games })])
  //   .range([0, h])

  // draw bars
  svg.selectAll('rect')
    .data(newdata)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      // return i * (w / newdata.length)
      return xScale(d.Year)
    })
    .attr('y', function (d) {
      return h - d.Num_games * 2
    })
    .attr('width', w / newdata.length - barPadding)
    .attr('height', function (d) {
      return d.Num_games * 2
    })
    .attr('fill', function (d) {
      return 'rgb(0, 0, ' + Math.round(d.Num_games * 5) + ')'
    })

  // add labels
  svg.selectAll('text')
    .data(newdata)
    .enter()
    .append('text')
    .text(function (d) {
      return d.Num_games
    })
    .attr('x', function (d, i) {
      // return i * (w / newdata.length) + (w / newdata.length - barPadding) / 2
      return xScale(d.Year) + 5
    })
    .attr('y', function (d) {
      if (d.Num_games > 10) {
        return h - (d.Num_games * 2) + 10
      } else {
        return h - (d.Num_games * 2) - 5
      }
    })
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', function (d) {
      if (d.Num_games > 10) {
        return 'white'
      } else {
        return 'black'
      }
    })
})
