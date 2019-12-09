import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'

import Lightpick from 'lightpick'
import "./lightpick.css"

function About(props) {
    const {
        getHomelessShelterCensusData,
        homelessShelterCensusData
    } = props

    const [minDate, setMinDate] = useState(0)
    const [maxDate, setMaxDate] = useState(0)

    const scatterRef = useRef(null)
    const datePickerStartRef = useRef(null)
    const datePickerEndRef = useRef(null)

// GET DATA
    useEffect(() => {
        getHomelessShelterCensusData()
    }, [getHomelessShelterCensusData])

// SET DATE PICKER ON FIRST MOUNT / WHEN DATA IS FETCHED
    useEffect(() => {
        const pickerStart = datePickerStartRef.current
        const pickerEnd = datePickerEndRef.current
        let lastMin = null
        let lastMax = null
        const datePicker = new Lightpick({
            field: pickerStart,
            secondField: pickerEnd,
            singleDate: false,
            selectForward: true,
            repick: true,
            onSelect: (start, end) => {
                if (!lastMin || start.unix() !== lastMin.unix()) {
                    lastMin = start
                    setMinDate(start)
                }
                if (!lastMax || end.unix() !== lastMax.unix()) {
                    lastMax = end
                    setMaxDate(end)
                }
            }
        })
        if (homelessShelterCensusData.length) {
            const minDate = Date.parse(homelessShelterCensusData[homelessShelterCensusData.length - 1].date_of_census)
            const maxDate = Date.parse(homelessShelterCensusData[0].date_of_census)
            datePicker.setDateRange(new Date(minDate), new Date(maxDate))
        }
        return () => datePicker.destroy()
    }, [homelessShelterCensusData])

// CREATE SCATTER PLOT WHEN NEW DATA COMES IN OR MIN MAX RANGE CHANGE
    useEffect(() => {
        createScatterPlot()

        function createScatterPlot() {
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

            const data = homelessShelterCensusData.map(datum => {
                datum = Object.assign({}, datum)
                datum.date_of_census = Date.parse(datum.date_of_census)
                return datum
            })
                .filter(datum => {
                    if (minDate && maxDate) {
                        return datum.date_of_census / 1000 > minDate.unix()
                            && datum.date_of_census / 1000 < maxDate.unix()
                    } else {
                        return true
                    }
                })

            const x = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return d.date_of_census; }))
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
                .attr("cx", function (d) { return x(d.date_of_census); })
                .attr("cy", function (d) { return y(parseInt(d.total_individuals_in_shelter)); })
                .attr("r", 1.5)
                .style("fill", "#69b3a2")
        }
    }, [minDate, maxDate, homelessShelterCensusData])

    // function structureHomelessShelterCensusData() {
    //     return (
    //         homelessShelterCensusData.map((dataPoint, idx) => {
    //             return (
    //                 <li key={idx}>
    //                     {dataPoint.date_of_census}
    //                     <br/>
    //                     {dataPoint.total_individuals_in_shelter}
    //                     <br/>
    //                     {dataPoint.total_single_adults_in_shelter}
    //                     <br/>
    //                     {dataPoint.families_with_children_in_shelter}
    //                     <br/>
    //                     {dataPoint.adult_families_in_shelter}
    //                 </li>
    //             )
    //         })
    //     )
    // }

    return (
        <div>
            {/* {structureHomelessShelterCensusData()} */}
            <div ref={scatterRef}></div>
            <input type="text" ref={datePickerStartRef}></input>
            <input type="text" ref={datePickerEndRef}></input>
        </div>
    )
}

export default About