import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import useListenMessage from '../../hooks/useListenMessage'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessage()
  // console.log("messages", messages)
  const messageRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      messageRef.current.scrollIntoView({behavior: 'smooth'})
    }, 100)
  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton />
      )}
      {!loading && messages.length === 0 && <span className='flex items-center justify-center'>Send a message to start the conversation</span>}
      {!loading && messages.length > 0 && messages.map(m => <div key={m._id} ref={messageRef}>
        <Message message={m} />
      </div>)}
    </div>
  )
}

export default Messages