import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {loading, login} = useLogin()

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log(username, password)
    await login(username, password)
  }
  return (
    <div className='border border-slate-500 border-opacity-40 rounded-sm flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login <span className='text-teal-500'>sChat</span>
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Username</span>
                </label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="" id="" placeholder='Enter username' className='w-full input input-bordered h-10' />
              </div>
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Password</span>
                </label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" id="" placeholder='Enter password' className='w-full input input-bordered h-10' />
              </div>
              <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                Don't have an account ?
              </Link>
              <div>
                <button disabled={loading} className='btn btn-block btn-sm mt-2'>{
                  loading ? <span className='loading loading-spinner'></span> : "Login"
                }</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login