import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

function About(props) {
    const {
        getHomelessShelterCensusData,
        homelessShelterCensusData
    } = props

    const scatterRef = useRef(null) 

    useEffect(() => {
        getHomelessShelterCensusData()
    }, [getHomelessShelterCensusData])

    useEffect(() => {
        createScatterPlot()
    }, [homelessShelterCensusData])

    function createScatterPlot () {
        console.log(homelessShelterCensusData)
        const margin = { top: 10, right: 30, bottom: 60, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        d3.select(scatterRef.current)
            .selectAll("*")
            .remove()

        const svg = d3.select(scatterRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const data = homelessShelterCensusData

        const parseTime = d3.timeParse("%d-%b-%y");
        // var parseTime = d3.timeParse("%d-%b-%y");
        // data.forEach(function (d) {
        //     d.date_of_census = parseTime(d.date_of_census);
        // });

        const x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return Date.parse(d.date_of_census); }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%Y-%m-%d")))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        const y = d3.scaleLinear()
            .domain([57000, 62000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(Date.parse(d.date_of_census)); })
            .attr("cy", function (d) { return y(parseInt(d.total_individuals_in_shelter)); })
            .attr("r", 1.5)
            .style("fill", "#69b3a2")
            

    }

    function structureHomelessShelterCensusData() {
        return (
            homelessShelterCensusData.map((dataPoint, idx) => {
                return (
                    <li key={idx}>
                        {dataPoint.date_of_census}
                        <br/>
                        {dataPoint.total_individuals_in_shelter}
                        <br/>
                        {dataPoint.total_single_adults_in_shelter}
                        <br/>
                        {dataPoint.families_with_children_in_shelter}
                        <br/>
                        {dataPoint.adult_families_in_shelter}
                    </li>
                )
            })
        )
    }

    return (
        <div>
            {/* {structureHomelessShelterCensusData()} */}
            <div ref={scatterRef}></div>
        </div>
    )
}

export default About