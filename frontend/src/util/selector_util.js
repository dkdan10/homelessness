export const formUserConversationsObject = (currentUser, conversations, users) => {
    let userConversationsObject = {}
    Object.values(conversations).forEach(conversation => {
        const nonCurrentUserIds = conversation.participants.filter(userId => userId !== currentUser.id)
        if (nonCurrentUserIds.length) {
            userConversationsObject[nonCurrentUserIds[0]] = {
                conversationId: conversation._id,
                otherUserId: nonCurrentUserIds[0],
                username: users[nonCurrentUserIds[0]].username
            }
        } else {
            userConversationsObject[currentUser.id] = {
                conversationId: conversation._id,
                otherUserId: currentUser.id,
                username: users[currentUser.id].username
            }
        }
    })
    return userConversationsObject
}