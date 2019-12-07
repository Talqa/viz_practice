// variables:
var w = 600
var h = 400
var padding = 15

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

// helper functions:
var rowConverter = function (d) {
  // convert data from string to other formats where needed
  return {
    Critic_Score: +d.Critic_Score,
    Name: d.Name,
    Publisher: d.Publisher,
    Year: +d.Year,
    NA_Sales: +d.NA_Sales
  }
}

// dataset
var dataset

// load and use dataset
// everything you want to do needs to be within the data loading function (csv)
d3.csv('data/vgsales-12-4-2019_critic_score.csv', rowConverter, function (data) {
  dataset = data

  // console.table(data);
  // console.log(data);

  // partial data selection for testing
  var newdata = dataset.filter(function (d) {
    return d.Publisher === 'Nintendo'
  })

  var xScale = d3.scaleLinear()
    .domain([d3.min(newdata, function (d) { return d.Critic_Score }),
      d3.max(newdata, function (d) { return d.Critic_Score })])
    .range([padding, w - padding])
    .nice()

  var yScale = d3.scaleLinear()
    .domain([d3.min(newdata, function (d) { return d.NA_Sales }),
      d3.max(newdata, function (d) { return d.NA_Sales })])
    .range([h - padding, padding])
    .nice()

  var aScale = d3.scaleSqrt()
    .domain([d3.min(newdata, function (d) { return d.NA_Sales }),
      d3.max(newdata, function (d) { return d.NA_Sales })])
    .range([2, 10])
    .nice()

  // add circles
  svg.selectAll('circle')
    .data(newdata)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
    //   return d.Critic_Score * 50
      return xScale(d.Critic_Score)
    })
    .attr('cy', function (d) {
    //   return h - (d.NA_Sales * 100) - 10
      return yScale(d.NA_Sales)
    })
    .attr('r', function (d) {
    //   return Math.sqrt(d.NA_Sales * 100)
      return aScale(d.NA_Sales)
    })
    .attr('fill', 'orange')

  // add labels
  svg.selectAll('text')
    .data(newdata)
    .enter()
    .append('text')
    .text(function (d) {
      return d.NA_Sales
    })
    .attr('x', function (d) {
    //   return d.Critic_Score * 50
      return xScale(d.Critic_Score)
    })
    .attr('y', function (d) {
    //   return h - (d.NA_Sales * 100) - 10
      return yScale(d.NA_Sales)
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'blue')
})
