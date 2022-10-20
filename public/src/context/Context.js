import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import mockFollowers from './mockData/mockFollowers'
import mockRepos from './mockData/mockRepos'
import mockUser from './mockData/mockUser'
import { useNavigate } from 'react-router-dom'

const AppContext = React.createContext()

const rootUrl = 'https://api.github.com'
const AppProvider = ({ children }) => {
  
  
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState(0)
  const [error, setError] = useState({ show: false, msg: '' })
  const [alert, setAlert] = useState({ type: '', text: '' })
  

  const fetchRequests = async () => {
    const data = await axios(`${rootUrl}/rate_limit`)
    let remaining = data.data.rate.remaining
    //  remaining = 0
    setRequests(remaining)
    if (remaining == 0) {
      toggleError(true, "Sorry, You've Exceeded Your hourly Rate Limit!")
    }
  }
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg })
  }
  useEffect(() => {
    fetchRequests()
  }, [])

  const searchUsers = async (user) => {
    setLoading(true)
    toggleError()
    try {
      const response = await axios(`${rootUrl}/users/${user}`)
      setGithubUser(response.data)

      const { login, followers_url } = response.data
      const followersResponse = await axios(`${followers_url}?per_page=100`)
      setFollowers(followersResponse.data)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      toggleError(true, 'There Is No User With That Username.')
    }
  }
  const removeAlert = () => {
    setTimeout(() => {
         setAlert({})
       },2000)
  }
  
  const loginUser = async (currentUser) => {
   
     
    const { email, password, source } = currentUser
    try {
      
        const res = await axios.post(
          `${process.env.REACT_APP_BACK_URL}/v1/login`,
          {
            email,
            password,
          }
        )
      
      const token = res.data.token
      document.cookie = `token=${token}`
      window.open('/dashboard',"_same")
    
    } catch (error) {
      setAlert({ type: 'danger', text: 'Invalid Credentials' })
      removeAlert()
    }
  }
  

  const registerUser = async (currentUser) => {
         
    const { name,email, password, source } = currentUser
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/v1/login`,
        {
          name,
          email,
          password,
        }
      )

      const token = res.data.token
      document.cookie = `token=${token}`
      window.open('/dashboard', '_same')
    } catch (error) {
      setAlert({ type: 'danger', text: 'Invalid Credentials' })
      removeAlert()
    }
  }

  return (
    <AppContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUsers,
        loading,
        setLoading,
        alert,
        setAlert,
        loginUser,
        registerUser,
        removeAlert,
      }}
    >
      {' '}
      {children}{' '}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { useGlobalContext, AppProvider }
