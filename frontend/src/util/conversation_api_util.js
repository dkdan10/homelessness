import axios from 'axios'

export const createConversation = (conversationData) => {
    return axios.post('/api/conversations/create', conversationData)
}

export const getAllConversations = () => {
    return axios.get('/api/conversations/all')
}