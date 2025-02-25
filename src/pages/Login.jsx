import { Link, useNavigate } from 'react-router-dom'
import { Info, LoaderCircle, LockIcon, Mail, X } from 'lucide-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LogoWithText from '../components/LogoWithText'
import TogglePassword from '../components/commun/TogglePassword'
import { useContext, useRef } from 'react'
import { AuthContext, ThemeContext } from '../context/contexts'
import useCustomAxios from '../hooks/useCustomAxios'
import { toast } from 'react-toastify'
import useToast from '../hooks/useToast'

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .email(),
  password: yup
    .string()
    .trim()
    .required()
});

function Login() {

  const { isDarkMode } = useContext(ThemeContext);

  const { showToast } = useToast();

  const navigator = useNavigate();

  const customAxios = useCustomAxios();

  const { setAccessToken, setUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { isSubmitting }, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const handleClick = () => navigator('/auth/account-activation', {
    state: {
      email: getValues("email"),
      sendEmailOnLoad: true
    }
  });

  const handleFormSubmit = async (data) => {
    try {
      const response = await customAxios.post('/auth/login', data);

      const token = response.data.accessToken;
      const jwtBodyBase64 = token.split('.')[1];
      const jwtBody = JSON.parse(atob(jwtBodyBase64));

      setAccessToken(token);
      setUser(jwtBody);

      navigator('/');
    } catch (error) {
      if (error.response.status === 400) { // invalid credentials
        showToast("Invalid credentials!", toast.error);
      } else if (error.response.status === 403) { // account is not activated, need to check email.
        showToast(() => (
          <div>
            You need to activate your account to log in, check your inbox for instructions.
            <button
              onClick={handleClick}
              className='ms-1 underline hover:no-underline'
            >
              Resend Email
            </button>
          </div>
        ), toast.info);
      } else {
        navigator(`/internal-server-error`, {
          state: {
            statusCode: error.response.status,
            message: 'Server Error'
          }
        });
      }
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Link to="/" className='hidden md:flex items-center ms-4 mt-3 w-fit'>
          <LogoWithText />
        </Link>

        <form onSubmit={handleSubmit(handleFormSubmit)} className='px-3 w-96 max-w-full mx-auto mt-28 md:mt-16 flex-grow sm:m-0 sm:px-0 sm:w-96 sm:absolute sm:top-[45%] sm:left-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2'>
          <h1 className='transition-all duration-500 ease-in-out text-3xl md:text-4xl font-semibold text-center mb-4 text-neutral-900 dark:text-zinc-50'>👋 Welcome back!</h1>
          <p className='transition-all duration-500 ease-in-out text-sm md:text-lg font-normal text-center text-neutral-900 dark:text-zinc-50 mb-6'>Log in to access your account</p>

          <div className='w-full my-4'>
            <label htmlFor="email" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Email</label>
            <div className='relative'>
              <input
                type="email"
                placeholder='jhondoe@example.com'
                className='transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                {...register('email')}
              />
              <Mail className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
            </div>
          </div>

          <div className='w-full my-4'>
            <label htmlFor="password" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Password</label>
            <div className='relative'>
              <input
                id="password"
                type="password"
                placeholder='******'
                className='transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-purple-600'
                {...register('password')}
              />
              <LockIcon className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
              <TogglePassword inputId="password" />
            </div>
          </div>

          <div className='w-full flex justify-between items-center px-2 mt-8'>
            <Link to="/auth/forgot-password" className='transition-colors duration-500 ease-in-out text-slate-600 dark:text-slate-300 hover:underline'>Forgot password?</Link>
            <button
              disabled={isSubmitting}
              type='submit'
              className={`transition-colors duration-500 ease-in-out ${isSubmitting ? "bg-purple-400 dark:bg-purple-600 cursor-wait" : "bg-purple-500 dark:bg-purple-700 cursor-pointer"} hover:bg-purple-400 dark:hover:bg-purple-600 text-zinc-100 flex justify-center py-2 px-8 md:px-12 font-bold rounded-xl`}
            >
              {isSubmitting
                ?
                <LoaderCircle className='animate-spin' />
                :
                "Log in"
              }
            </button>
          </div>

          <hr className='transition-colors duration-500 ease-in-out border-slate-300 dark:border-slate-800 my-5' />
          <p className='transition-colors duration-500 ease-in-out text-center text-slate-600 dark:text-slate-400'>Don't have an account?<Link to="/auth/register" className='transition-colors duration-500 ease-in-out text-zinc-950 dark:text-slate-50 underline hover:no-underline ps-2'>Signup</Link></p>
        </form>
        <div className='transition-colors duration-500 ease-in-out text-slate-500 text-sm text-center w-full pb-3 mt-20 sm:absolute sm:bottom-2 sm:right-1/2 sm:translate-x-1/2'>
          Radfi Abdallah © 2024 | All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Login