import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import noImg from '../noImg.png'

export const Navbar = () => {
  const { loading, setLoading } = useGlobalContext()
    const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', profileImg: '' })
  const fetch = async () => {
     setLoading(true)
    const token = document.cookie.slice(6)
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    const { data: res } = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/v1/dashboard`,
      config
    )

    const { name, email, profileImg } = res.user
    setUser({ name, email, profileImg })
    setLoading(false)

  }

  const handleLogout = async () => {
  
    try {
      const { data: res } = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/v1/logout`
      )
      document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      navigate('/signup')
       
    } catch (error) {
      
    }
      
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <section className='navbar d-flex align-item-center justify-content-center'>
      {user && (
        <div className='img'>
          <img
            src={user.profileImg ? user.profileImg:noImg}
            alt={user.name}
          />
        </div>
      )}

      {user && (
        <h4 className='mx-3 my-0 text-center'>
          Welcome, <strong>{user.name}</strong> <br />({user.email})
        </h4>
      )}

      {user && (
        <button className='btn p-0 text-gray' onClick={handleLogout}>
          Logout
        </button>
      )}
    </section>
  )
}
