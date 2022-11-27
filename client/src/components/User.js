import React from 'react'
import { useGlobalContext } from '../context/Context'
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md'

export const User = () => {
  const { githubUser } = useGlobalContext()
  const { avatar_url, name, location, html_url, bio, login, company, blog } =
    githubUser

  const { followers } = useGlobalContext()

  return (
    <section className='section-center'>
      <div className='grid'>
        <article className='cardy u'>
          <div className='header '>
            <img src={avatar_url} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>@{login}</p>
            </div>
            <a className='btn btn-outline-info cbtn' href={html_url}>
              Follow
            </a>
          </div>
          <p>{bio}</p>
          <div className='links '>
            <p>
              <MdBusiness></MdBusiness> {company}
            </p>
            <p>
              <MdLocationOn />
              {location || 'Somewhere On Earth'}
            </p>
            <a href={blog}>
              {' '}
              <MdLink></MdLink>
              {blog}
            </a>
          </div>
        </article>

        <article className='cardy f'>
          <div className='followers'>
            {followers.map((item) => {
              return (
                <div className='line flex-row' key={item.id}>
                  <img src={item.avatar_url} alt='' />
                  <div className='ml-2'>
                    <h4 className='mb-0'>{item.login}</h4>
                    <a href={item.html_url}>{item.html_url}</a>
                    
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}
