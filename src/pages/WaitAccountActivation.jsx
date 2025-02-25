import { Mail } from 'lucide-react'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingPage from '../components/commun/LoadingPage';
import useCustomAxios from '../hooks/useCustomAxios';
import { toast } from "react-toastify";
import { ThemeContext } from '../context/contexts';
import useToast from '../hooks/useToast';

function WaitAccountActivation() {

  const { isDarkMode } = useContext(ThemeContext);

  const { showToast } = useToast();

  const navigator = useNavigate();

  const location = useLocation();
  const email = location.state?.email;
  const sendEmailOnLoad = location.state?.sendEmailOnLoad || false;

  const [isDisabled, setIsDisabled] = useState(false);

  const customAxios = useCustomAxios();

  useEffect(() => {
    const timerId = setTimeout(() => setIsDisabled(false), 1000) // disable the send button for 5 minutes

    return () => clearTimeout(timerId);
  }, [isDisabled]);

  const handleResendEmail = async () => {
    setIsDisabled(true);
    try {
      await customAxios.post('/auth/account-activation', { email });
      // email was sent successfully;
      showToast('Another account activation email was sent successfully!', toast.success);
    } catch (error) {
      let message = "Server Error";

      if (error.response.status === 400) {
        message = error.response.data.message;
      } else if (error.response.status === 404) {
        message = `User with email ${email} does not exist!`;
      }

      navigator(`/${message.split(' ').join('-')}`, {
        state: {
          statusCode: error.response.status,
          message
        }
      });
    }
  }

  useEffect(() => {
    //if the page was accessed via url, redirect to 404 page
    if (!email) {
      navigator('/page-not-found');
    }
    else if (sendEmailOnLoad) {
      handleResendEmail();
    }
  }, []);

  return (
    email
      ?
      <div className='flex flex-col justify-end min-h-screen'>

        <div className='transition-all duration-500 ease-in-out w-80 md:w-96 shadow-lg md:shadow-xl shadow-zinc-300 dark:shadow-none border border-zinc-300 dark:border-zinc-500 rounded-lg py-16 px-6 mx-auto flex flex-col items-center gap-5 md:gap-6 absolute top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2'>
          <div className='transition-colors duration-500 ease-in-out w-fit p-3 md:p-4 text-zinc-700 dark:text-zinc-300 box-content rounded-full border-4 border-zinc-700 dark:border-zinc-300'>
            <Mail className='size-12 md:size-14' />
          </div>
          <h1 className='transition-colors duration-500 ease-in-out text-zinc-700 dark:text-zinc-300 text-2xl md:text-3xl'>Check your inbox</h1>
          <p className='transition-colors duration-500 ease-in-out text-zinc-700 dark:text-zinc-300 text-sm md:text-lg text-center'>Please check the email address {email} for instructions to activate you account</p>
          <button
            title={`${isDisabled ? 'Email was sent, check you inbox' : 'Resend email'}`}
            onClick={handleResendEmail}
            disabled={isDisabled}
            className={`transition-colors duration-500 ease-in-out border border-zinc-400 dark:border-zinc-500 w-full py-3 md:py-4 rounded-lg text-zinc-600 dark:text-zinc-300 text-lg md:text-xl ${isDisabled ? 'cursor-not-allowed' : 'hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-900'}`}
          >
            Resend email
          </button>
        </div>

        {/* footer */}
        <div className='text-slate-500 text-sm text-center w-full pb-3 mt-20'>
          Radfi Abdallah © 2024 | All rights reserved.
        </div>

      </div>
      :
      <LoadingPage />
  )
}

export default WaitAccountActivation