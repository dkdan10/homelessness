import React, {useEffect} from 'react'

function About(props) {
    const {
        getHomelessShelterCensusData,
        homelessShelterCensusData
    } = props

    useEffect(() => {
        getHomelessShelterCensusData()
    }, [getHomelessShelterCensusData])

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
            {structureHomelessShelterCensusData()}
        </div>
    )
}

export default About