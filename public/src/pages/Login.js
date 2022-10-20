import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {

  return (
    <section className='container-fluid section'>
      <div className='row '>
        <div className='col-md-5'>
          <img
            src='https://publictrainingcenters.com/img/login-img.png'
            alt=''
            className='w-100'
          />
        </div>
        <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
          <h1 className='text-center text-info display-2'> GitHub Users </h1>
          <Link to='/signup'  style={{'display':'contents'}}>
            <button className='btn btn-dark mt-5 w-50'>Login / Sign Up</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
