export const formConversationsObject = (currentUser, conversations, users) => {
    const conversationsObject = {}
    const userToConversationId = {}
    Object.values(conversations).forEach(conversation => {
        const nonCurrentUserIds = conversation.participants.filter(userId => userId !== currentUser.id)
        if (nonCurrentUserIds.length) {
            conversationsObject[conversation._id] = {
                conversationId: conversation._id,
                otherUserId: nonCurrentUserIds[0],
                username: users[nonCurrentUserIds[0]].username,
                // messages: []
            }
            userToConversationId[nonCurrentUserIds[0]] = conversation._id
        } else {
            conversationsObject[conversation._id] = {
                conversationId: conversation._id,
                otherUserId: currentUser.id,
                username: users[currentUser.id].username,
                // messages: []
            }
            userToConversationId[currentUser.id] = conversation._id
        }
    })
    return {
        userConversations: conversationsObject,
        userToConversationId: userToConversationId
    }
}