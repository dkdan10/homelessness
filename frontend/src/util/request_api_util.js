import axios from 'axios'

export const createRequest = (requestData) => {
    return axios.post('/api/requests/create', requestData)
}

export const getAllRequests = () => {
    return axios.get('/api/requests/all')
}