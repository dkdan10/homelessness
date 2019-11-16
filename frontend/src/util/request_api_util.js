import axios from 'axios'

export const createRequest = (requestData) => {
    return axios.post('/api/requests/create', requestData)
}