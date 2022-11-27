import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalContext } from '../context/Context'

export const Search = () => {
  const [user, setUser] = useState('')
  const { requests, error, searchUsers } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user) {
      searchUsers(user)
      // setUser('')
    }
  }

  return (
    <section className='section-center mb-1'>
      <div className='row justify-content-between align-item-center'>
        {error.show && (
          <span className='text-danger ml-2 h5'> {error.msg} </span>
        )}
        <div className='col-md-9'>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text search-icon'>
                  <FaSearch> </FaSearch>
                </span>
              </div>
              <input
                className='form-control form-control-lg'
                placeholder='Search Github User '
                value={user}
                onChange={(e) => setUser(e.target.value)}
              ></input>
              <div className='input-group-append'>
                <span className='form-group-text'>
                  <button
                    type='submit'
                    className='btn btn-info
                     btn - search '
                    disabled={requests === 0}
                  >
                    Search
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className='col-md-3 text-gray '>
          <h2> Requests: {requests} / 60 </h2>
        </div>
      </div>
    </section>
  )
}
