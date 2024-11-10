import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AtSign, LoaderCircle, LockIcon, Mail, User } from 'lucide-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LogoWithText from '../components/LogoWithText';
import TogglePassword from '../components/commun/TogglePassword'
import InputErrorMessage from '../components/commun/InputErrorMessage'
import FormAlert from '../components/commun/FormAlert'
import useCustomAxios from '../hooks/useCustomAxios'

const schema = yup.object().shape({
    fullName: yup
        .string("Invalid full name")
        .trim()
        .required("Full name is required"),
    username: yup
        .string("Invalid username")
        .trim()
        .required("Username is required"),
    email: yup
        .string()
        .trim()
        .required("Email address is required")
        .email("Invalid email"),
    password: yup
        .string()
        .trim()
        .required("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-.,;\/#]).{8,}$/, "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one number, and one symbol."),
    confirmPassword: yup
        .mixed()
        .oneOf([yup.ref('password')], "Passwords must match")
});

function Signup() {

    const navigator = useNavigate();

    const customAxios = useCustomAxios();

    const [showAlert, setShowAlert] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (data) => {
        delete data.confirmPassword;

        try {
            // if request succeeded, a verification email is sent;
            await customAxios.post(`/auth/register`, data);
            navigator('/auth/account-activation', { state: { email: data.email } });

        } catch (error) {
            // input validation failed on the server, show error messages
            if (error.response.status === 400) {
                const errorMessages = error.response.data.errorMessages;
                Object.keys(errorMessages).forEach(field => setError(field, { message: errorMessages[field] }));
            } else {
                // server error occured
                setShowAlert(true);
            }
        }
    }

    return (
        <div className='flex flex-col min-h-screen'>
            {/* the logo */}
            <Link to="/" className='hidden md:flex items-center ms-4 mt-3 w-fit'>
                <LogoWithText />
            </Link>

            {/* the form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className='px-3 w-96 max-w-full sm:px-0 sm:w-96 mx-auto mt-10 flex-grow'>
                <h1 className='transition-all duration-500 ease-in-out text-3xl md:text-4xl font-semibold text-center mb-4 text-neutral-900 dark:text-zinc-50'>Sign up</h1>

                {
                    showAlert
                    &&
                    <FormAlert boldMessage="Server Error!" normalMessage="Try Later" setShowAlert={setShowAlert} />
                }

                {/* full name field */}
                <div className='w-full my-4'>
                    <label htmlFor="fullName" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Full name</label>
                    <div className='relative mb-1'>
                        <input
                            type="text"
                            id="fullName"
                            placeholder='Jhon Doe'
                            className={`transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 ${errors.fullName?.message ? "focus:ring-red-500" : "dark:focus:ring-purple-600"}`}
                            {...register("fullName")}
                        />
                        <User className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                    {errors.fullName && <InputErrorMessage message={errors.fullName.message} />}
                </div>

                {/* username field */}
                <div className='w-full my-4'>
                    <label htmlFor="username" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Username</label>
                    <div className='relative mb-1'>
                        <input
                            type="text"
                            id="username"
                            placeholder='DJhon'
                            className={`transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 ${errors.username?.message ? "focus:ring-red-500" : "dark:focus:ring-purple-600"}`}
                            {...register("username")}
                        />
                        <AtSign className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                    {errors.username && <InputErrorMessage message={errors.username.message} />}
                </div>

                {/* email field */}
                <div className='w-full my-4'>
                    <label htmlFor="email" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Email</label>
                    <div className='relative mb-1'>
                        <input
                            type="email"
                            id="email"
                            placeholder='jhondoe@example.com'
                            className={`transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 ${errors.email?.message ? "focus:ring-red-500" : "dark:focus:ring-purple-600"}`}
                            {...register("email")}
                        />
                        <Mail className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                    </div>
                    {errors.email && <InputErrorMessage message={errors.email.message} />}
                </div>

                {/* password field */}
                <div className='w-full my-4'>
                    <label htmlFor="password" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Password</label>
                    <div className='relative mb-1'>
                        <input
                            type="password"
                            id="password"
                            placeholder='******'
                            className={`transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 ${errors.password?.message ? "focus:ring-red-500" : "dark:focus:ring-purple-600"}`}
                            {...register("password")}
                        />
                        <LockIcon className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                        <TogglePassword inputId="password" />
                    </div>
                    {errors.password && <InputErrorMessage message={errors.password.message} />}
                </div>

                {/* password confirmation field */}
                <div className='w-full my-4'>
                    <label htmlFor="confirmPassword" className='transition-colors duration-500 ease-in-out text-base md:text-lg text-slate-800 dark:text-slate-200 inline-block mb-2 ps-1'>Confirm password</label>
                    <div className='relative mb-1'>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder='******'
                            className={`transition-colors duration-500 ease-in-out w-full bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-none py-2 md:py-3 px-10 md:px-12 text-base md:text-lg text-neutral-900 dark:text-zinc-50 rounded-xl focus:outline-none focus:ring-2 ${errors.confirmPassword?.message ? "focus:ring-red-500" : "dark:focus:ring-purple-600"}`}
                            {...register("confirmPassword")}
                        />
                        <LockIcon className='size-5 md:size-6 transition-colors duration-500 ease-in-out absolute top-3 md:top-4 left-3 text-slate-500 dark:text-slate-200' />
                        <TogglePassword inputId="confirmPassword" />
                    </div>
                    {errors.confirmPassword && <InputErrorMessage message={errors.confirmPassword.message} />}
                </div>

                <div className='mt-10'>
                    <button
                        disabled={isSubmitting}
                        type='submit'
                        className={`w-full transition-colors duration-500 ease-in-out ${isSubmitting ? "bg-purple-400 dark:bg-purple-600 cursor-wait" : "bg-purple-500 dark:bg-purple-700 cursor-pointer"} hover:bg-purple-400 dark:hover:bg-purple-600 text-zinc-100 flex justify-center py-2 px-8 md:px-12 font-bold rounded-xl`}
                    >
                        {isSubmitting
                            ?
                            <LoaderCircle className='animate-spin' />
                            :
                            "Sign up"
                        }
                    </button>
                </div>

                <hr className='transition-colors duration-500 ease-in-out border-slate-300 dark:border-slate-800 my-5' />
                <p className='transition-colors duration-500 ease-in-out text-center text-slate-600 dark:text-slate-400'>Already have an account?<Link to="/auth/login" className='transition-colors duration-500 ease-in-out text-zinc-950 dark:text-slate-50 underline hover:no-underline ps-2'>Sing in</Link></p>
            </form>

            {/* footer */}
            <div className='text-slate-500 text-sm text-center w-full pb-3 mt-20'>
                Radfi Abdallah © 2024 | All rights reserved.
            </div>
        </div>
    )
}

export default Signup