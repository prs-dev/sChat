import { useState } from "react"
import {useAuthContext} from '../context/AuthContext'
import {toast} from 'react-hot-toast'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const login = async(username, password) => {
      const check = handleInputErrors(username, password)
      if(!check) return
      setLoading(true)
    try {
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {'content-type': "application/json"},
            body: JSON.stringify({username, password})
        })
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
        toast.success("User logged in successfully")
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {loading, login}
}

const handleInputErrors = (username, password) => {
    if(!username || !password ) {
        toast.error("Please fill all the fields")
        return false
    }

    return true
}

export default useLogin