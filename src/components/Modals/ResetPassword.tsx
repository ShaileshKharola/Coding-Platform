import React from 'react';

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    
    return (
        <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8'>
            <h3 className='text-xl font-medium text-white'>Reset Password</h3>
            <p className='text-sm text-white'>
                Enter your email address and we will send you a link to reset your password.
            </p>
            <div>
                <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-300'>
                    Your email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 shadow-sm placeholder-gray-400 text-white'
                    placeholder='name@company.com'/>
            </div>
            <button type='submit' className='w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Send Reset Link
            </button>
        </form>
    )
}
export default ResetPassword;