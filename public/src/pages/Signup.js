import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import google from '../signin.jpg'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  source: '',
}

export const Signup = () => {
  const [value, setValue] = useState(initialState)
  const [cookies, setCookie] = useCookies()
  const {
    loading,
    alert,
    setAlert,
    setLoading,
    loginUser,
    registerUser,
    removeAlert,
  } = useGlobalContext()

  const socialLogin = async (e) => {
    e.preventDefault()

    window.open('/auth/google', '_self')
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, isMember, source } = value

    if (!email || !password || (!isMember && !name)) {
      setAlert({ type: 'danger', text: 'Please provide all details' })
      removeAlert()
      return
    }

    const currentUser = { name, email, password, source }

    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  const toggleMember = () => {
    setValue({ ...value, isMember: !value.isMember })
  }

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 2000)
  //   }
  // }, [])
  return (
    <main className='register'>
      <div className='card rcard'>
        {/* <img src={logo} alt='' /> */}
        <div className='card-body pt-0'>
          <h3 className='text-center font-monospace card-title'>
            {value.isMember ? 'Login' : 'Register'}
          </h3>
          <p className={`text-${alert.type} text-center alert`}>{alert.text}</p>

          <form onSubmit={handleSubmit} className='form'>
            {!value.isMember && (
              <input
                name='name'
                value={value.name}
                onChange={handleChange}
                className='form-control'
                placeholder='Name'
              ></input>
            )}

            <input
              name='email'
              value={value.email}
              onChange={handleChange}
              className='form-control'
              placeholder='Email'
            ></input>
            <input
              type='password'
              name='password'
              value={value.password}
              onChange={handleChange}
              className='form-control'
              placeholder='Password'
            ></input>

            <div className='text-center'>
              <button
                // disabled={isLoading}
                type='submit'
                className='btn sbtn w-100 mb-2 '
              >
                {value.isMember ? 'Login' : 'Register'}
              </button>

              <p>
                {value.isMember ? 'Not a Member Yet?' : ' Already a Member?'}

                <a onClick={toggleMember} className='link'>
                  {!value.isMember ? 'Login' : 'Register'}
                </a>
              </p>
              <p>OR</p>
              <p>
                <button onClick={socialLogin}>
                  <img src={google} alt='' />
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
