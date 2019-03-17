
function main(){
d3.select("#elo").append("p").text("witamy!")

console.log(d3.select("#elo"))

var sizeFactor = 1.5;

function dragstart(d){
    d3.select(this)
        .attr("fill", "red")
        .attr("r", d.r *= sizeFactor)
}

function dragging(d){
    d3.select(this)
        .attr("cx", d.x = d3.event.x)
        .attr("cy", d.y = d3.event.y)
}

function dragend(d){
    d3.select(this)
        .attr("fill", "black")
        .attr("r", d.r =  d.r/sizeFactor)
}

data = [{x:100, y:100, r:25},
        {x:40, y:20, r:10}];

d3.select("#body")
    .attr("width", 500)
    .attr("height", 600)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    // .transition()
    .attr("r", d => d.r)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .call(d3.drag()
            .on("start", dragstart)
            .on("drag", dragging)
            .on("end", dragend))


}