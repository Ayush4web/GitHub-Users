import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <div className="container ">
      <div className="row section text-center align-items-center ">
        <div className="col height-60 d-flex flex-column justify-content-evenly">
          <h1 className="font-weight-bold display-1 ">
            <strong>404</strong>
          </h1>
          <h2 className="text-danger">OOPS!! Page Not found</h2>
          <Link to="/">
            <button className="btn btn-info ">Back To Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
