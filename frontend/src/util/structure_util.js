export const structureConversationsWithoutCurrentUser = (conversations, currentUser) => {
    const structuredConversations = {}
    Object.values(conversations).forEach(conversation => {
        const otherUserId = conversation.participants.filter(userId => userId !== currentUser.id)[0]
        const messages = conversation.messages ? conversation.messages : []
        if (otherUserId) {
            structuredConversations[conversation._id] = {
                conversationId: conversation._id,
                otherUserId: otherUserId,
                messages: messages
            }
        } else {
            structuredConversations[conversation._id] = {
                conversationId: conversation._id,
                otherUserId: currentUser.id,
                messages: messages
            }
        }
    })
    return structuredConversations
}