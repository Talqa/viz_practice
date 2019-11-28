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
    //below are columns of the full dataset
    return {
        Critic_Score: parseFloat(d.Critic_Score),
        Developer: d.Developer,
        ESRB_Rating: d.ESRB_Rating,
        Genre: d.Genre,
        Global_Sales: parseFloat(d.Global_Sales),
        JP_Sales: parseFloat(d.JP_Sales),
        Last_Update: d.Last_Update,
        NA_Sales: parseFloat(d.NA_Sales),
        Name: d.Name,
        Other_Sales: parseFloat(d.Other_Sales),
        PAL_Sales: parseFloat(d.PAL_Sales),
        Platform: d.Platform,
        Publisher: d.Publisher,
        Rank: parseFloat(d.Rank),
        Total_Shipped: parseFloat(d.Total_Shipped),
        User_Score: parseFloat(d.User_Score),
        VGChartz_Score: parseFloat(d.VGChartz_Score),
        Vgchartzscore: parseFloat(d.Vgchartzscore),
        Year: parseFloat(d.Year),
        basename: d.basename,
        img_url: d.img_url,
        status: d.status,
        url: d.url
    };
}

    //dataset
    var dataset;

    //load and use dataset
    //everything you want to do needs to be within the data loading function (csv)
    d3.csv("data/vgsales-12-4-2019.csv", rowConverter, function(data) {
        dataset = data;
        
        //console.table(data);
        //console.log(data);
    
        // partial data selection for testing
        newdata = dataset.filter(function(d) {return d.Publisher=="Nintendo"; });



    });