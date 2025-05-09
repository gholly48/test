import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    console.log(formData)
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
    setLoading(true)
    const res = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (data.success === false) {
        setError(data.message)
        setLoading(false)
      return
    }
      setLoading(false)
      setError(null)
      console.log(data.message)
      navigate('/sign-in')
  } catch (error) {
      setError(error.message);
      console.log(data)
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='text'
                placeholder='name'
                className='bg-white border p-3 rounded-lg'
                id='name'
                onChange={handleChange}
              />
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
               {loading ? 'Loading...' : 'Sign Up'}
              </button>
            
            </form>
            <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
