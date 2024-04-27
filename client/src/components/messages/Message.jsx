import React from 'react'
import useConversation from '../../zustand/useConversation'
import {useAuthContext} from '../../context/AuthContext'

const Message = ({message}) => {
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const chatClassName = fromMe ? 'chat-end' : "chat-start"
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic
    const bubbleColor = fromMe ? 'bg-blue-500': ''

    const shakeClass = message.shake ? "shake" : ""

    const changeDate = (date) => {
        const newDate = new Date(date).toLocaleTimeString()
        return newDate
    }

    // console.log("test",new Date(message.createdAt).toLocaleTimeString())
    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className="w-10 rounded-full">
                    <img
                        src={profilePic}
                        alt='user avatar'
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass}`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{changeDate(message?.createdAt)}</div>
        </div>
    )
}

export default Message