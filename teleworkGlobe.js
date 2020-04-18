var width = 960,
    height = 600,
    radius = height / 2 - 5,
    scale = radius,
    velocity = 0.02;

var projection = d3.geoOrthographic()
    .translate([width / 2, height / 2])
    .scale(scale)
    .clipAngle(90);

var canvas = d3.select("canvas"),
    context = canvas.node().getContext("2d"),
    path = d3.geoPath().projection(projection).context(context);

//  Globe background dimensions
var centerX = width / 2,
    centerY = height / 2,
    radius = height / 2;

//  Draw globe surface each frame
d3.json("world.json", function(error, world) {

    if (error) throw error;
    var land = topojson.feature(world, world.objects.land);
    
    d3.timer(function(elapsed) {

        // Draw globe background
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#003c8f";
        context.fill();

        // context.clearRect(0, 0, width, height);
        projection.rotate([velocity * elapsed, 0]);
        
        context.beginPath();
        path(land);

        context.fillStyle = "white";
        context.fill();

    });
});