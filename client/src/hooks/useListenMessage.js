import { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import sound from '../assets/notification.mp3'

const useListenMessage = () => {
  const {socket} = useSocketContext()
  const {messages, setMessages} = useConversation()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
        newMessage.shake = true
        const s = new Audio(sound)
        s.play()
        setMessages([...messages, newMessage])
    })
    return () => socket.off('newMessage')
  }, [socket, messages])
}

export default useListenMessage