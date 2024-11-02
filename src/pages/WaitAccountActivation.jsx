import { Mail } from 'lucide-react'
import React from 'react'

function WaitAccountActivation({ email = "jhondoe@gmail.com" }) {
  return (
    <div className='flex flex-col justify-end min-h-screen'>

      <div className='transition-all duration-300 ease-in-out w-80 md:w-96 shadow-lg md:shadow-xl shadow-zinc-300 dark:shadow-none border border-zinc-300 dark:border-zinc-500 rounded-lg py-16 md:py-20 px-6 mx-auto flex flex-col items-center gap-5 md:gap-6 absolute top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2'>
        <div className='transition-colors duration-300 ease-in-out w-fit p-3 md:p-4 text-zinc-700 dark:text-zinc-300 box-content rounded-full border-4 border-zinc-700 dark:border-zinc-300'>
          <Mail className='size-12 md:size-14' />
        </div>
        <h1 className='transition-colors duration-300 ease-in-out text-zinc-700 dark:text-zinc-300 text-2xl md:text-3xl'>Check your email</h1>
        <p className='transition-colors duration-300 ease-in-out text-zinc-700 dark:text-zinc-300 text-sm md:text-lg text-center'>Please check the email address {email} for instructions to activate you account</p>
        <button className='transition-colors duration-300 ease-in-out border border-zinc-400 dark:border-zinc-500 w-full py-3 md:py-4 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 text-lg md:text-xl hover:bg-white dark:hover:bg-zinc-900'>Resend email</button>
      </div>

      {/* footer */}
      <div className='text-slate-500 text-sm text-center w-full pb-3 mt-20'>
        Radfi Abdallah © 2024 | All rights reserved.
      </div>

    </div>
  )
}

export default WaitAccountActivation