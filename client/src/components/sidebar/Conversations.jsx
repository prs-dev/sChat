import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../../../server/utils/emojis'

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  console.log("convo", conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((item, i) => (
        <Conversation 
          key={item._id}
          conversation={item}
          emoji={getRandomEmoji()}
          lastIdx={i === conversations.length - 1}
        />
      ))}
        {loading ? <span className='loading loading-spinner mx-auto'></span>:null}
    </div>
  )
}

export default Conversations