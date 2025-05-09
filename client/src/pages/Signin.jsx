import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  signInStart, 
  signInSuccess, 
  signInFailure,
  clearError } from '../redux/user/userSlice'

export default function Signin() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    // console.log(formData)
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(clearError())
      dispatch(signInStart())
       const res = await fetch('http://localhost:3000/auth/signin', {
        credentials: 'include',
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
       },
        body: JSON.stringify(formData),
      })
 
    const data = await res.json()
    console.log(data)
    if (!res.ok) {
      // خطا از سرور (مثل 401 یا 400)
      dispatch(signInFailure(data.message || 'مشکلی در ورود پیش آمد'))
      return;
    }

    dispatch(signInSuccess(data))
      navigate('/')
  } catch (error) {
    dispatch(signInFailure(error.message || 'مشکلی در اتصال به سرور پیش آمد'))
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            
              <input
                type='email'
                placeholder='email'
                className='bg-white border p-3 rounded-lg'
                id='email'
                onChange={handleChange}
              />
              <input
                type='password'
                placeholder='password'
                className='bg-white border p-3 rounded-lg'
                id='password'
                onChange={handleChange}
              />
      
              <button
                
                disabled={loading} className='bg-pink-500 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80'
              >
               {loading ? 'Loading...' : 'Sign In'}
              </button>
            
            </form>
            <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
