import React from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <div>
      <div>
        <h1>
            <Link to='/login'>Login</Link>
        </h1>
        <br/>
        <h1>
        <Link to='/signup'>Sign up</Link>
        </h1>
      </div>

      <br/>
      {/* <h2>{props.name ?  `welcome - ${props.name}` : "Login please"}</h2> */}
      <h1>hii</h1>
    </div>
  )
}

export default Home