
function main(){

    let height = 600;
    let width = 1500;

    let contaier = d3.select("div")
                    .append("svg")
                    .attr("id", "container")
                    .attr("width", width)
                    .attr("height", height)

    let label = d3.select("div")
                .append("div")
                .attr("id", "label")
                .text("asdasdasd")

    
    d3.csv("data.csv").then(plotData)

    function plotData(data){

        let xMargin = 120;
        let yMargin = 50;
        let clicked1 = false;
        let clicked2 = false;

        let maximumValue1 = d3.max(data, d => +d.Value);
        let maximumValue2 = d3.max(data, d => +d.Value2)
        let maximumValue = maximumValue1 > maximumValue2 ? maximumValue1 : maximumValue2;
        // console.log(maximumValue)
        // let maximumValue = maximumValue1;

        let barScale = d3.scaleLinear()
                            .domain([0, maximumValue])
                            .range([0, width-xMargin-100])

        let yScale = d3.scaleBand()
                            .domain(data.map(d => d.Name))
                            .range([0, height/1.4])
                            .padding(0.2)

        let rectangles = contaier.append("g")
                            .attr("id", "bars")
                            .attr("transform", `translate(${xMargin},${yMargin})`)
                            .selectAll("rect")
                            
        let rectangles2 = contaier.append("g")
                            .attr("id", "bars2")
                            .attr("transform", `translate(${xMargin},${yMargin})`)
                            .selectAll("rect")

        let xAxis = d3.axisBottom(barScale)
        contaier.append("g").attr("id", "axis")
            .attr("transform", `translate(${xMargin},${height - yMargin - 60})`)
            .call(xAxis)



        var symbol = d3.symbol().size(1000).type(d3.symbolCross);
        var scaleChange = 1.2;
        let pluses = contaier.append("g")
                            .attr("id", "control")
                            .attr("transform", `translate(${xMargin-40},${yMargin+20})`)
                            

        function appendPlus(yPos, controlId, color, clicked, minVal, valKey){
                pluses.append("g")
                            .attr("transform", `translate(0,${yPos})`)
                            .append("path")
                            .attr("d", symbol)
                            .attr("fill", color)
                            // .attr("y", yPos)
                            .on("click", function(){
                                clicked = clicked ? false : true;
                                animateBars(controlId, clicked, minVal, valKey);
                            } )
                            .on("mouseover", function(){
                                d3.select(this).attr("transform", `scale(${scaleChange})`)
                                // d3.select(this).scale(1.2)
                            })
                            .on("mouseleave", function(){
                                d3.select(this).attr("transform", `scale(${1})`)
                            })
        }
          
        
        let stableOpa = 0.85
        function appendRectangles(parent, dataKey, color){
            parent.data(data)
                        .enter()
                        .append("rect")
                        // .attr("id", "val1")
                        .attr("y", d => yScale(d.Name))
                        .attr("width", d => barScale(d[dataKey]))
                        .attr("height", yScale.bandwidth())
                        .attr("fill", color)
                        .attr("opacity", stableOpa)
                        .on("mouseenter", function(d){
                            // console.log("mouseover")
                            // let currentH = yScale.bandwidth();
                            d3.select(this).attr("opacity", 0.95);
                            let currY = +(d3.select(this).attr("y")) + 70;
                            let currentW = +(d3.select(this).attr("width"));
                            label.style("top", currY +"px")
                                    // .transition()
                                    // .delay(750)
                                    // .duration(500)
                                    .style("left", currentW + 100 + "px")
                                    .transition().duration(500)
                                    .style("left", currentW + 150 + "px")
                                    .style("display", "block")
                                    .text(d.Name + " " + d[dataKey])
                        })
                        .on("mouseleave", function(){
                            // let currentH = yScale.bandwidth()
                            d3.select(this).attr("opacity", stableOpa);
                            label.style("display", "none").style("left", "500px")

                            // label.
                            // d3.selectAll("#label").remove()
                        })
        }

        let color1 = "#003366"
        let color2 =  "#00aa66"

        appendPlus(10, "#bars", color1, clicked1, 40, 'Value');                 
        appendPlus(80, "#bars2", color2, clicked2, 20, 'Value2');  

        appendRectangles(rectangles, 'Value', color1);
        appendRectangles(rectangles2, 'Value2', color2)

        // contaier.select("#bars").selec

        function animateBars(id, clicked, minVal, valKey){
            
            // console.log(clicked)
            d3.select(id)
                .selectAll("rect")
                .transition()
                .delay((d,i) => 50*i)
                .duration((d,i) => 800*(i+1))
                .attr("width", d => clicked ? minVal : barScale(+d[valKey]))
                // .transition()
                // .attr("width", d => { barScale(d.Value) })
        }
    }
    
}


