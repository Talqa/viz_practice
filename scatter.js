// variables:
var w = 600
var h = 400
var padding = 45

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

  // set scales and axes
  var xScale = d3.scaleLinear()
    .domain([0,
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

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // you need to have scale set domain min low enough to show 0

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(8)
    .tickFormat(d3.format('.1f'))

  // add circles
  svg.selectAll('circle')
    .data(newdata)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return xScale(d.Critic_Score)
    })
    .attr('cy', function (d) {
      return yScale(d.NA_Sales)
    })
    .attr('r', function (d) {
      return aScale(d.NA_Sales)
    })
    .attr('fill', '#D88011')

  // add circle labels
  //   svg.selectAll('text')
  //     .data(newdata)
  //     .enter()
  //     .append('text')
  //     .text(function (d) {
  //       return d.NA_Sales
  //     })
  //     .attr('x', function (d) {
  //     //   return d.Critic_Score * 50
  //       return xScale(d.Critic_Score)
  //     })
  //     .attr('y', function (d) {
  //     //   return h - (d.NA_Sales * 100) - 10
  //       return yScale(d.NA_Sales)
  //     })
  //     .attr('font-family', 'sans-serif')
  //     .attr('font-size', '11px')
  //     .attr('fill', 'blue')

  // add x axis title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', w / 2)
    .attr('y', h)
    .text('Critic Score')

  // add y axis title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', -h / 2)
    .attr('y', 10)
    .attr('transform', 'rotate(-90)')
    .text('North America Sales [Milions]')

  // add plot title
  svg.append('text')
    .attr('class', 'axesTitle')
    .style('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('x', w / 2)
    .attr('y', 20)
    .text('Video Game Critic Score vs Sales in North America')

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
