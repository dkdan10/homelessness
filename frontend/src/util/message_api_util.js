import axios from 'axios'

export const createMessage = (messageData) => {
    return axios.post('/api/messages/create', messageData)
}
