import React, { useEffect } from 'react'
import { Info } from '../components/Info'
import { Navbar } from '../components/Navbar'
import { Search } from '../components/Search'
import { Repos } from '../components/Repos'
import { User } from '../components/User'
import { useGlobalContext } from '../context/Context'
import loader from '../preloader.gif'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


export const Dashboard = () => {
  const { loading} = useGlobalContext()
  const navigate = useNavigate()
   const [cookies, setCookie] = useCookies()
  
  const token = cookies.token
  console.log(`all cookie in daashboard `, cookies)
     
  useEffect(() => {
    if (!token) {
         navigate('/signup')
    }
   
  },[token])

  if (loading) {
    return (
      <>
        <Navbar />
        <Search />
        <div className='text-center my-4'>
          <img src={loader} className='' alt='Loading' />
        </div>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <Search />
      <Info />
      <User />
      {/* <Repos></Repos> */}
    </>
  )
}
