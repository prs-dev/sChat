import { useState } from "react"
import { toast } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

    const signup = async({fullName, username, password, confirmPassword, gender}) => {
        // toast.success('reached')
        setLoading(true)
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})

        // console.log(success)

        if(!success) {
            return
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })
            const data = await res.json()
            if(data.error) {
                throw new Error(data.error)
            }

            //localstorage
            localStorage.setItem('chat-user', JSON.stringify(data))

            //context
            setAuthUser(data)

            console.log(data)
            toast.success("User Registered")
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, signup}
}

const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }

    if(password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if(password.length < 6) {
        toast.error("Password must be atleast 6 characters long")
        return false
    }

    return true
}

export default useSignup