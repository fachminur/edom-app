"use client"
import React, { useState, useEffect } from 'react'
import { InputText  } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import axios from 'axios';
import { loginService } from './service/login';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validation, setValidation] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log(session);

  const handleSubmit = async(e) => {
    e.preventDefault()
    setValidation({})
    const payload = {
      'username': username,
      'password': password  
    }
    // const data = loginService(payload)
    // console.log(data);
    await axios.post('/auth/login/api', payload)
    .then((res) => {
      const {data} = res.data
      console.log(data);
      signIn("credentials",{
        staraToken: data.token,
        userInfo: JSON.stringify(data.user_info),
        redirect: false
      })
    })
    .catch((err) => {
      const { data, status } = err.response
      if (status === 422) {
        setValidation(data.ValidationError)
      }else if (status === 400) {
        setErrorMsg('Username atau Password Salah!')
      }else {
        setErrorMsg(data.message)
      }
    })
  }

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, router])

  return (
    <main className='flex items-center justify-center h-screen bg-gray-100'>
      <form>
        <div className='bg-white w-96 p-6 rounded shadow-sm'>
          <div className='flex items-center justify-center mb-4'>
            <img
              className="h-32"
              src="/img/heydomedia.jpg"
              alt="company logo"
            />
          </div>
          {
            errorMsg ?
              <div className='flex items-center justify-center'>
                <Message severity="error" text={errorMsg} style={{ background: '#ffe7e6', width:'100%' }} />
              </div>
            :
              null
          }
          <div className="grid gap-1 grid-cols-1 py-2">
            <label htmlFor="username">Username</label>
            <InputText 
              id="username" 
              className={validation?.Username ? "p-inputtext-sm p-invalid" : "p-inputtext-sm" } 
              aria-describedby="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} />
            {
              validation?.Username ? 
                <small id="username" className='p-error'>
                  {validation.Username[0]}
                </small>
              :
                null
            }
          </div>
          <div className="grid gap-1 grid-cols-1 py-2">
            <label htmlFor="password">Password</label>
            <Password 
              name="password" 
              id="password" 
              value={password} 
              className={validation?.Password ? "p-inputtext-sm p-invalid" : "p-inputtext-sm" } 
              onChange={(e) => setPassword(e.target.value)} toggleMask style={{ display:"grid" }} />
            {
              validation?.Password ? 
                <small id="username" className='p-error'>
                  {validation.Password[0]}
                </small>
              :
                null
            }
          </div>
          <div className='py-2'>
            <Button onClick={(e) => handleSubmit(e)} label="Submit" className='w-full' size='small' />
          </div>
        </div>
      </form>
    </main>
  )
}

export default LoginPage