//variables:
var w = 600;
var h = 400;

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//helper functions:
var rowConverter = function(d) {
    //convert data from string to other formats where needed
    return {
        Critic_Score: +d.Critic_Score,
        Name: d.Name,
        Publisher: d.Publisher,
        Year: +d.Year,
        NA_Sales: +d.NA_Sales
    };
}

    //dataset
    var dataset;

    //load and use dataset
    //everything you want to do needs to be within the data loading function (csv)
    d3.csv("data/vgsales-12-4-2019_critic_score.csv", rowConverter, function(data) {
        dataset = data;
        
        //console.table(data);
        //console.log(data);
    
        // partial data selection for testing
        newdata = dataset.filter(function(d) {
            return d.Publisher=="Nintendo" 
            });

        //add circles
        svg.selectAll("circle")  
           .data(newdata)
           .enter()
           .append("circle")  
           .attr("cx", function(d) {
               return d.Critic_Score * 50;
           })
           .attr("cy", function(d) {
               return h - (d.NA_Sales * 100) - 10;
           })
           .attr("r", function(d) {
               return Math.sqrt(d.NA_Sales * 100);
           });

           //add labels
           svg.selectAll("text")  
                .data(newdata)
                .enter()
                .append("text")
                .text(function(d) {
                    return d.Name;
                })
                .attr("x", function(d) {
                    return d.Critic_Score * 50;
                })
                .attr("y", function(d) {
                    return h - (d.NA_Sales * 100) - 10;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "red");

    });