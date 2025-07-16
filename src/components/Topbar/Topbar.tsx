import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type TopbarProps = {};

const Topbar:React.FC<TopbarProps> = () => {
    const [user]=useAuthState(auth);
    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-700 text-dark-gray-7'>
            <div className='flex w-full items-center justify-between max-[1200px] mx-auto'>
            <Link href='/' className='h-[40px] flex items-center'>
                <img src='./logo.png' alt='Logo' className='h-full' />
            </Link>
            <div className='flex items-center space-x-4 ml-auto'>
                <div>
                <a
                    href="#"
                    target='_blank'
                    rel='noreferrer'
                    className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'
                >
                    Premium
                </a>
                </div>
                
            {!user && (
                <Link href='/auth'>
                    <button className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                        Sign In
                    </button>
                </Link>
            )}
            {user && ( 
                <div className='cursor-pointer group relative'>
                    <img src='./avatar.png' alt='user profile img' className='h-8 w-8 rounded-full'/>
                </div>
            )}
            </div>
        </div>
            </nav>
        
    )
}
export default Topbar;