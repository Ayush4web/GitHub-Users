import React from 'react'
import { useGlobalContext } from '../context/Context'
import { GoRepo, GoGist } from 'react-icons/go'
import { FiUsers, FiUserPlus } from 'react-icons/fi'

export const Info = () => {
  const { githubUser } = useGlobalContext()
  const { public_repos, followers, following, public_gists } = githubUser

  const items = [
    {
      id: 1,
      color: 'pink',
      icon: <GoRepo />,
      label: 'repos',
      value: public_repos,
    },
    {
      id: 2,
      color: 'green',
      icon: <FiUsers />,
      label: 'followers',
      value: followers,
    },
    {
      id: 3,
      color: 'purple',
      icon: <FiUserPlus />,
      label: 'following',
      value: following,
    },
    {
      id: 4,
      color: 'yellow',
      icon: <GoGist />,
      label: 'gists',
      value: public_gists,
    },
  ]

  return (
    <section className='section-center mt-1'>
      <div className='row g-0 justify-content-between'>
        {items.map((item) => {
          return (
            <article key={item.id} className='col-lg-auto col-md-6 my-4 card'>
              <span className={`${item.color}`}>{item.icon}</span>
              <div className='title text-center'>
                <h3 className='mb-0'>{item.value}</h3>
                <p className='text-info label'>{item.label}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
