// variables:
var w = 1000
var h = 400
var barPadding = 0.1
var padding = 40

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

// var parseYear = d3.timeParse('%Y')

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
    Year: +d.Year, // do not use parseYear(d.Year) in bar chart
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
  var newdata = dataset.filter(function (d) {
    return d.Publisher === 'Nintendo'
  })
  console.log(newdata)

  // set scales and axes
  var xScale = d3.scaleBand()
    .domain(newdata.map(function (d) { return d.Year }))
    .range([padding, w - padding])
    .padding(barPadding)

  var yScale = d3.scaleLinear()
    .domain([d3.min(newdata, function (d) { return d.Num_games }),
      d3.max(newdata, function (d) { return d.Num_games })])
    .range([h - padding, padding])

  var xAxis = d3.axisBottom()
    .scale(xScale)

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(8)

  // draw bars
  svg.selectAll('rect')
    .data(newdata)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return xScale(d.Year)
    })
    .attr('y', function (d) {
      return yScale(d.Num_games)
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) {
      return h - padding - yScale(d.Num_games) // h-padding because you need ot invert here too
    })
    .attr('fill', '#D88011')

  // add bar labels
  svg.selectAll('text')
    .data(newdata)
    .enter()
    .append('text')
    .text(function (d) {
      return d.Num_games
    })
    .attr('x', function (d, i) {
      return xScale(d.Year) + 10
    })
    .attr('y', function (d) {
      if (d.Num_games > 10) {
        return yScale(d.Num_games) + 10
      } else {
        return yScale(d.Num_games) - 5
      }
    })
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Optima, Futura, sans-serif')
    .attr('font-size', '10px')
    .attr('fill', 'black'
    // function (d) {
    //   if (d.Num_games > 10) {
    //     return 'white'
    //   } else {
    //     return 'black'
    //   }
    // }
    )

  // add x axis title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', w / 2)
    .attr('y', h)
    .text('Year')

  // add y axis title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', -h / 2)
    .attr('y', 10)
    .attr('transform', 'rotate(-90)')
    .text('Number of Video Games Sold')

  // add plot title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', w / 2)
    .attr('y', 20)
    .text('Number of Games Sold per Year')

  // add axes
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + (h - padding) + ')')
    .call(xAxis)

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis)
})
