import axios from 'axios'

export const getHomelessShelterCensusData = () => {
    return axios.get('/api/data/homelessShelterCensus')
}