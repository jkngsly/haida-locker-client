import { setToken } from '@/features/auth/authSlice';
import { useAppDispatch } from '@app/hooks';
import { useLoginMutation } from '@features/api/authApi';
import { Button } from 'primereact/button';
import * as React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { register, getValues  } = useForm();
  const doLogin = useLoginMutation()

  // 👇 API Login Mutation
  const [login, { isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const handleLoginClick = async () => {
    try {
        //await login(getValues()).unwrap().then(() => { 
        await login({ email: "jkngsly@gmail.com", password: "AJd8w9Z32#$!"}).unwrap().then((data) => { 
          dispatch(setToken(data))
          navigate('/portal')
        })
    } catch (err) {
        console.error('Upload failed: ', err);
    }

  }

  return (
    <div className="page-wrapper">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input value="jkngsly@gmail.com" {...register('email') } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
        <div className="mb-6">
          <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input value="AJd8w9Z32#$!" {...register('password') } className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;