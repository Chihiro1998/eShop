import React, { useState } from 'react'
import { Link } from 'react-router-dom'



function Register() {

  const handleSubmit = (e) => {
    console.log(e.username)
  }
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='text-center'>
        <h1 className='font-bold'>Create new account</h1>
        <p>
          Already have an account?
          <Link className="hover:underline" to='/auth/login'>Login</Link>
        </p>
      </div>

      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className='p-6 rounded-lg shadow-md w-80'>
          {/* Username */}
          <div>
            <label className='block text-sm'>Username</label>
            <input
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full mt-3 p-1 border rounded-md'
              required />
          </div>
          <div>
            <label className='block text-sm'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full mt-3 p-1 border rounded-md'
              required />
          </div>
          <div>
            <label className='block text-sm'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full mt-3 p-1 border rounded-md'
              required />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "hsl(234.5 89.5% 73.9%)" }}
            className="w-full mt-3 py-2 rounded-md hover:bg-red-400 transition"
          >
            Sign up
          </button>




        </form>
      </div>
    </div>

  )
}

export default Register